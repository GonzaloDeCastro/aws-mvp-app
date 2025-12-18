-- =====================================================
-- Asegurar que los triggers y stored procedure existan
-- =====================================================
-- Este script crea el stored procedure y triggers si no existen
-- para calcular automáticamente el precio de productos compuestos
-- =====================================================

DELIMITER $$

-- =====================================================
-- PARTE 1: Stored Procedure para recalcular precio
-- =====================================================

DROP PROCEDURE IF EXISTS `recalculate_composite_price`$$

CREATE PROCEDURE `recalculate_composite_price`(
    IN p_product_id BIGINT UNSIGNED
)
BEGIN
    DECLARE v_calculated_price DECIMAL(12,2) DEFAULT 0.00;
    DECLARE v_has_components INT DEFAULT 0;
    
    -- Verificar si el producto tiene componentes
    SELECT COUNT(*) INTO v_has_components
    FROM `product_components`
    WHERE `parent_product_id` = p_product_id;
    
    -- Si tiene componentes, calcular precio
    IF v_has_components > 0 THEN
        SELECT COALESCE(SUM(pc.`qty` * p.`price`), 0.00) INTO v_calculated_price
        FROM `product_components` pc
        INNER JOIN `products` p ON pc.`component_product_id` = p.`id`
        WHERE pc.`parent_product_id` = p_product_id;
        
        -- Actualizar el precio del producto padre
        UPDATE `products`
        SET `price` = v_calculated_price
        WHERE `id` = p_product_id;
    END IF;
END$$

DELIMITER ;

-- =====================================================
-- PARTE 2: Triggers para actualización automática
-- =====================================================

DELIMITER $$

-- Trigger: Después de INSERT en product_components
DROP TRIGGER IF EXISTS `trg_product_components_after_insert`$$

CREATE TRIGGER `trg_product_components_after_insert`
AFTER INSERT ON `product_components`
FOR EACH ROW
BEGIN
    CALL `recalculate_composite_price`(NEW.`parent_product_id`);
END$$

-- Trigger: Después de UPDATE en product_components (cambio de qty)
DROP TRIGGER IF EXISTS `trg_product_components_after_update`$$

CREATE TRIGGER `trg_product_components_after_update`
AFTER UPDATE ON `product_components`
FOR EACH ROW
BEGIN
    -- Si cambió la cantidad o el componente, recalcular
    IF OLD.`qty` != NEW.`qty` OR OLD.`component_product_id` != NEW.`component_product_id` THEN
        CALL `recalculate_composite_price`(NEW.`parent_product_id`);
    END IF;
END$$

-- Trigger: Después de DELETE en product_components
DROP TRIGGER IF EXISTS `trg_product_components_after_delete`$$

CREATE TRIGGER `trg_product_components_after_delete`
AFTER DELETE ON `product_components`
FOR EACH ROW
BEGIN
    CALL `recalculate_composite_price`(OLD.`parent_product_id`);
END$$

-- Trigger: Después de UPDATE en products.price (cuando cambia precio de un componente)
DROP TRIGGER IF EXISTS `trg_products_after_update_price`$$

CREATE TRIGGER `trg_products_after_update_price`
AFTER UPDATE ON `products`
FOR EACH ROW
BEGIN
    -- Si cambió el precio, recalcular todos los productos compuestos que lo usan
    IF OLD.`price` != NEW.`price` THEN
        -- Recalcular todos los productos padre que tienen este producto como componente
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
-- Verificación
-- =====================================================
-- Ejecuta estos queries para verificar que todo funciona:

-- Ver triggers creados:
-- SHOW TRIGGERS WHERE `Table` = 'product_components';
-- SHOW TRIGGERS WHERE `Table` = 'products';

-- Ver stored procedure:
-- SHOW PROCEDURE STATUS WHERE `Name` = 'recalculate_composite_price';

-- Probar el stored procedure manualmente:
-- CALL `recalculate_composite_price`(1); -- Reemplaza 1 con un ID de producto compuesto
