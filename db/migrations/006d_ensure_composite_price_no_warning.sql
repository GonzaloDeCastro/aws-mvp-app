-- =====================================================
-- Versión SIN DROP IF EXISTS (evita warnings)
-- =====================================================
-- Si ya ejecutaste el script anterior y solo viste warnings,
-- este script verifica primero y solo crea si no existe
-- =====================================================

-- PASO 1: Crear el stored procedure (solo si no existe)
SET @proc_exists = (
    SELECT COUNT(*) 
    FROM INFORMATION_SCHEMA.ROUTINES 
    WHERE ROUTINE_SCHEMA = DATABASE() 
    AND ROUTINE_NAME = 'recalculate_composite_price'
);

SET @sql = IF(@proc_exists = 0,
    'CREATE PROCEDURE `recalculate_composite_price`(
        IN p_product_id BIGINT UNSIGNED
    )
    BEGIN
        DECLARE v_calculated_price DECIMAL(12,2) DEFAULT 0.00;
        DECLARE v_has_components INT DEFAULT 0;
        
        SELECT COUNT(*) INTO v_has_components
        FROM `product_components`
        WHERE `parent_product_id` = p_product_id;
        
        IF v_has_components > 0 THEN
            SELECT COALESCE(SUM(pc.`qty` * p.`price`), 0.00) INTO v_calculated_price
            FROM `product_components` pc
            INNER JOIN `products` p ON pc.`component_product_id` = p.`id`
            WHERE pc.`parent_product_id` = p_product_id;
            
            UPDATE `products`
            SET `price` = v_calculated_price
            WHERE `id` = p_product_id;
        END IF;
    END',
    'SELECT "Procedure already exists" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- PASO 2-5: Los triggers se crean normalmente (DROP IF EXISTS es seguro aquí)
-- Ejecuta desde aquí en adelante solo si los triggers no existen

DROP TRIGGER IF EXISTS `trg_product_components_after_insert`;

DELIMITER $$

CREATE TRIGGER `trg_product_components_after_insert`
AFTER INSERT ON `product_components`
FOR EACH ROW
BEGIN
    CALL `recalculate_composite_price`(NEW.`parent_product_id`);
END$$

DELIMITER ;

DROP TRIGGER IF EXISTS `trg_product_components_after_update`;

DELIMITER $$

CREATE TRIGGER `trg_product_components_after_update`
AFTER UPDATE ON `product_components`
FOR EACH ROW
BEGIN
    IF OLD.`qty` != NEW.`qty` OR OLD.`component_product_id` != NEW.`component_product_id` THEN
        CALL `recalculate_composite_price`(NEW.`parent_product_id`);
    END IF;
END$$

DELIMITER ;

DROP TRIGGER IF EXISTS `trg_product_components_after_delete`;

DELIMITER $$

CREATE TRIGGER `trg_product_components_after_delete`
AFTER DELETE ON `product_components`
FOR EACH ROW
BEGIN
    CALL `recalculate_composite_price`(OLD.`parent_product_id`);
END$$

DELIMITER ;

DROP TRIGGER IF EXISTS `trg_products_after_update_price`;

DELIMITER $$

CREATE TRIGGER `trg_products_after_update_price`
AFTER UPDATE ON `products`
FOR EACH ROW
BEGIN
    IF OLD.`price` != NEW.`price` THEN
        UPDATE `products` p
        INNER JOIN `product_components` pc ON p.`id` = pc.`parent_product_id`
        SET p.`price` = (
            SELECT COALESCE(SUM(pc2.`qty` * p2.`price`), 0.00)
            FROM `product_components` pc2
            INNER JOIN `products` p2 ON pc2.`component_product_id` = p2.`id`
            WHERE pc2.`parent_product_id` = p.`id`
        )
        WHERE pc.`component_product_id` = NEW.`id`;
    END IF;
END$$

DELIMITER ;
