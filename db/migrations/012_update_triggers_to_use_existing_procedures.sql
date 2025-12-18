-- =====================================================
-- Actualizar triggers para usar los procedimientos existentes
-- =====================================================
-- Los procedimientos existentes son:
-- - sp_recalc_composite_price
-- - sp_recalc_price_if_has_children
-- =====================================================

-- Eliminar triggers antiguos si existen
DROP TRIGGER IF EXISTS `trg_product_components_after_insert`;
DROP TRIGGER IF EXISTS `trg_product_components_after_update`;
DROP TRIGGER IF EXISTS `trg_product_components_after_delete`;
DROP TRIGGER IF EXISTS `trg_products_after_update_price`;

-- =====================================================
-- Crear triggers que usan los procedimientos existentes
-- =====================================================

DELIMITER $$

-- Trigger 1: Después de INSERT en product_components
CREATE TRIGGER `trg_product_components_after_insert`
AFTER INSERT ON `product_components`
FOR EACH ROW
BEGIN
    CALL `sp_recalc_composite_price`(NEW.`parent_product_id`);
END$$

-- Trigger 2: Después de UPDATE en product_components
CREATE TRIGGER `trg_product_components_after_update`
AFTER UPDATE ON `product_components`
FOR EACH ROW
BEGIN
    -- Si cambió la cantidad o el componente, recalcular
    IF OLD.`qty` != NEW.`qty` OR OLD.`component_product_id` != NEW.`component_product_id` THEN
        CALL `sp_recalc_composite_price`(NEW.`parent_product_id`);
    END IF;
END$$

-- Trigger 3: Después de DELETE en product_components
CREATE TRIGGER `trg_product_components_after_delete`
AFTER DELETE ON `product_components`
FOR EACH ROW
BEGIN
    CALL `sp_recalc_composite_price`(OLD.`parent_product_id`);
END$$

-- Trigger 4: Después de UPDATE en products.price
-- Este trigger recalcula todos los productos padre cuando cambia el precio de un componente
CREATE TRIGGER `trg_products_after_update_price`
AFTER UPDATE ON `products`
FOR EACH ROW
BEGIN
    -- Si cambió el precio, recalcular todos los productos padre que usan este como componente
    IF OLD.`price` != NEW.`price` THEN
        -- Recalcular todos los productos padre que tienen este como componente
        -- Usar el procedimiento sp_recalc_composite_price para cada padre
        DECLARE done INT DEFAULT FALSE;
        DECLARE parent_id BIGINT UNSIGNED;
        DECLARE cur CURSOR FOR 
            SELECT DISTINCT parent_product_id 
            FROM product_components 
            WHERE component_product_id = NEW.id;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
        
        OPEN cur;
        read_loop: LOOP
            FETCH cur INTO parent_id;
            IF done THEN
                LEAVE read_loop;
            END IF;
            CALL `sp_recalc_composite_price`(parent_id);
        END LOOP;
        CLOSE cur;
    END IF;
END$$

DELIMITER ;

-- =====================================================
-- Verificar que se crearon
-- =====================================================
SELECT 
    TRIGGER_NAME,
    EVENT_OBJECT_TABLE,
    EVENT_MANIPULATION,
    ACTION_TIMING
FROM INFORMATION_SCHEMA.TRIGGERS
WHERE TRIGGER_SCHEMA = DATABASE()
  AND TRIGGER_NAME LIKE 'trg_product%'
ORDER BY TRIGGER_NAME;
