-- =====================================================
-- Crear SOLO el stored procedure (sin DROP)
-- =====================================================
-- IMPORTANTE: Si el procedimiento ya existe, te dará error
-- En ese caso, primero ejecuta: DROP PROCEDURE recalculate_composite_price;
-- =====================================================

DELIMITER $$

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
