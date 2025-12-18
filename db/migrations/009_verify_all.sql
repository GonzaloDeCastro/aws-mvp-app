-- =====================================================
-- VERIFICACIÓN COMPLETA
-- =====================================================
-- Ejecuta este script para verificar que TODO se creó
-- =====================================================

-- 1. Verificar STORED PROCEDURE
SELECT 
    'STORED PROCEDURE' as tipo,
    ROUTINE_NAME as nombre,
    CASE 
        WHEN ROUTINE_NAME IS NOT NULL THEN '✅ CREADO'
        ELSE '❌ NO EXISTE'
    END as estado
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_NAME = 'recalculate_composite_price';

-- 2. Verificar TRIGGERS
SELECT 
    'TRIGGER' as tipo,
    TRIGGER_NAME as nombre,
    EVENT_OBJECT_TABLE as tabla,
    EVENT_MANIPULATION as evento,
    '✅ CREADO' as estado
FROM INFORMATION_SCHEMA.TRIGGERS
WHERE TRIGGER_SCHEMA = DATABASE()
  AND TRIGGER_NAME LIKE 'trg_product%'
ORDER BY TRIGGER_NAME;

-- 3. Resumen
SELECT 
    COUNT(*) as total_triggers,
    'triggers encontrados' as descripcion
FROM INFORMATION_SCHEMA.TRIGGERS
WHERE TRIGGER_SCHEMA = DATABASE()
  AND TRIGGER_NAME LIKE 'trg_product%'

UNION ALL

SELECT 
    COUNT(*) as total_procedures,
    'procedures encontrados' as descripcion
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_NAME = 'recalculate_composite_price';

-- =====================================================
-- RESULTADO ESPERADO:
-- =====================================================
-- Deberías ver:
-- - 1 STORED PROCEDURE: recalculate_composite_price ✅
-- - 4 TRIGGERS: 
--   * trg_product_components_after_insert ✅
--   * trg_product_components_after_update ✅
--   * trg_product_components_after_delete ✅
--   * trg_products_after_update_price ✅
-- - Total: 4 triggers y 1 procedure
-- =====================================================
