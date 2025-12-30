# Scripts de Inicialización de Base de Datos

Este directorio contiene los scripts SQL que se ejecutan automáticamente al crear el contenedor de MySQL por primera vez.

## Cómo usar

1. Coloca tu archivo `.sql` (dump) en este directorio
2. Los scripts se ejecutarán automáticamente en orden alfabético cuando el contenedor se cree por primera vez
3. Los scripts **solo se ejecutan si el volumen de datos está vacío** (primera vez que creas el contenedor)

## Ejemplo

Si tienes un dump llamado `presuflow_dump.sql`, puedes renombrarlo a algo como:
- `01-init.sql`
- `dump.sql`
- O cualquier otro nombre que prefieras

El contenedor MySQL ejecutará todos los archivos `.sql`, `.sh`, `.sql.gz` que encuentre en este directorio en orden alfabético.

## Notas importantes

- ⚠️ Los scripts **NO se ejecutan** si el volumen ya tiene datos (contenedor recreado pero volumen existente)
- Si necesitas re-ejecutar los scripts, deberás eliminar el volumen: `docker volume rm aws-mvp-app_db-data`
- Los scripts se ejecutan como usuario `root`, así que pueden incluir `CREATE DATABASE`, `CREATE USER`, etc.

