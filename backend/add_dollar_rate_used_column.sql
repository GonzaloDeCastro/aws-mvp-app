-- Agregar columna para guardar el dólar de referencia usado al crear el presupuesto
ALTER TABLE quotes
ADD COLUMN dollar_rate_used DECIMAL(10, 2) DEFAULT NULL AFTER total_with_tax_ars;

-- Para presupuestos existentes, usar el dólar actual de cada compañía
UPDATE quotes q
INNER JOIN companies c ON c.id = q.company_id
SET q.dollar_rate_used = COALESCE(c.dollar_rate, 1470)
WHERE q.dollar_rate_used IS NULL;
