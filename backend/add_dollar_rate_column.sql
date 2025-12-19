-- Script para agregar el campo dollar_rate a la tabla companies
-- Ejecutar este script en tu base de datos MySQL

ALTER TABLE companies 
ADD COLUMN dollar_rate DECIMAL(10, 2) DEFAULT 1470.00 AFTER address;

-- Actualizar registros existentes con el valor por defecto si es NULL
UPDATE companies SET dollar_rate = 1470.00 WHERE dollar_rate IS NULL;
