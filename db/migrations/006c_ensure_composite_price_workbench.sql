-- =====================================================
-- Versión para MySQL Workbench - Ejecutar TODO junto
-- =====================================================
-- IMPORTANTE: En MySQL Workbench, selecciona TODO el script
-- y ejecútalo de una vez (Ctrl+Shift+Enter o botón Execute)
-- =====================================================

-- PASO 1: Crear el stored procedure
DROP PROCEDURE IF EXISTS `recalculate_composite_price`;

DELIMITER $$

CREATE PROCEDURE `recalculate_composite_price`(
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
END$$

DELIMITER ;

-- PASO 2: Crear trigger para INSERT
DROP TRIGGER IF EXISTS `trg_product_components_after_insert`;

DELIMITER $$

CREATE TRIGGER `trg_product_components_after_insert`
AFTER INSERT ON `product_components`
FOR EACH ROW
BEGIN
    CALL `recalculate_composite_price`(NEW.`parent_product_id`);
END$$

DELIMITER ;

-- PASO 3: Crear trigger para UPDATE
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

-- PASO 4: Crear trigger para DELETE
DROP TRIGGER IF EXISTS `trg_product_components_after_delete`;

DELIMITER $$

CREATE TRIGGER `trg_product_components_after_delete`
AFTER DELETE ON `product_components`
FOR EACH ROW
BEGIN
    CALL `recalculate_composite_price`(OLD.`parent_product_id`);
END$$

DELIMITER ;

-- PASO 5: Crear trigger para cuando cambia precio de un componente
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

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
-- Después de ejecutar, verifica con el script 008_quick_check.sql
