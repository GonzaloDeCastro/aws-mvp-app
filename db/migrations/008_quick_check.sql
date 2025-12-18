-- =====================================================
-- Verificación rápida
-- =====================================================
-- Ejecuta este script para ver si se crearon los objetos
-- =====================================================

-- 1. Verificar procedimiento
SELECT 
    'PROCEDURE' as tipo,
    ROUTINE_NAME as nombre,
    'OK' as estado
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_NAME = 'recalculate_composite_price'

UNION ALL

-- 2. Verificar triggers
SELECT 
    'TRIGGER' as tipo,
    TRIGGER_NAME as nombre,
    'OK' as estado
FROM INFORMATION_SCHEMA.TRIGGERS
WHERE TRIGGER_SCHEMA = DATABASE()
  AND TRIGGER_NAME LIKE 'trg_product%'

ORDER BY tipo, nombre;

-- Si no ves resultados, significa que no se crearon.
-- En ese caso, ejecuta el script 006c que está más abajo.
