-- Agregar columna para guardar el total con IVA en ARS al momento de crear el presupuesto
ALTER TABLE quotes
ADD COLUMN total_with_tax_ars DECIMAL(12, 2) DEFAULT NULL AFTER currency;

-- Para presupuestos existentes, calcular el total basado en el dólar actual de cada compañía
-- Nota: Esto es una aproximación, idealmente debería haberse guardado al crear
UPDATE quotes q
INNER JOIN companies c ON c.id = q.company_id
SET q.total_with_tax_ars = (
  SELECT COALESCE(
    SUM(
      ROUND(
        CASE
          WHEN qi.currency = 'USD' THEN qi.line_total * COALESCE(c.dollar_rate, 1470)
          ELSE qi.line_total
        END * (1 + COALESCE(t.rate, 0) / 100), 2
      )
    ), 0
  )
  FROM quote_items qi
  LEFT JOIN products p ON p.id = qi.product_id
  LEFT JOIN taxes t ON t.id = p.tax_id AND t.is_active = 1
  WHERE qi.quote_id = q.id
)
WHERE q.total_with_tax_ars IS NULL;
