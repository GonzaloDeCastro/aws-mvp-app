-- =====================================================
-- Script de verificación
-- =====================================================
-- Ejecuta este script para verificar que todo se creó correctamente
-- =====================================================

-- 1. Verificar que el stored procedure existe
SELECT 
    ROUTINE_NAME,
    ROUTINE_TYPE,
    CREATED,
    LAST_ALTERED
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_NAME = 'recalculate_composite_price';

-- 2. Verificar que los triggers existen
SELECT 
    TRIGGER_NAME,
    EVENT_MANIPULATION,
    EVENT_OBJECT_TABLE,
    ACTION_TIMING
FROM INFORMATION_SCHEMA.TRIGGERS
WHERE TRIGGER_SCHEMA = DATABASE()
  AND TRIGGER_NAME LIKE 'trg_product%'
ORDER BY TRIGGER_NAME;

-- 3. Probar el stored procedure (reemplaza 1 con un ID de producto compuesto si tienes)
-- CALL recalculate_composite_price(1);

-- Si no ves resultados, significa que el script anterior no se ejecutó completamente.
-- En ese caso, ejecuta nuevamente el script 006_ensure_composite_price_triggers.sql
