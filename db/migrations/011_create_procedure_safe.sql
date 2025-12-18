-- =====================================================
-- Crear procedimiento de forma segura
-- =====================================================
-- Este script elimina el procedimiento si existe y lo recrea
-- =====================================================

-- Eliminar si existe (esto puede dar warning, es normal)
DROP PROCEDURE IF EXISTS `recalculate_composite_price`;

-- Crear el procedimiento
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

-- Verificar que se creó
SELECT 
    'Procedimiento creado' as mensaje,
    ROUTINE_NAME as nombre
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_NAME = 'recalculate_composite_price';
