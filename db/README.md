# Base de Datos MySQL

Este directorio contiene la configuración y scripts de inicialización para la base de datos MySQL en Docker.

## Estructura

```
db/
├── init/              # Scripts SQL de inicialización (se ejecutan automáticamente)
│   ├── README.md      # Instrucciones sobre cómo usar los scripts
│   └── *.sql          # Dumps SQL (coloca tus archivos aquí)
└── README.md          # Este archivo
```

## Configuración

La base de datos está configurada en `docker-compose.yml` y `docker-compose.prod.yml` con las siguientes características:

- **Imagen**: MySQL 8.0
- **Puerto**: 3306 (expuesto en localhost)
- **Volumen**: `db-data` (persistente)
- **Health check**: Verifica que MySQL esté listo antes de iniciar otros servicios

## Variables de Entorno

Configura estas variables en tu archivo `.env`:

```env
DB_HOST=db                    # Nombre del servicio en Docker
DB_PORT=3306
DB_NAME=presuflow
DB_USER=presuflow_user
DB_PASSWORD=presuflow_password
DB_ROOT_PASSWORD=rootpassword
DB_SSL=false                  # En Docker local no se usa SSL
```

## Inicialización Automática

Los archivos SQL en `db/init/` se ejecutan automáticamente cuando:
1. El contenedor se crea por primera vez
2. El volumen de datos está vacío

### Cómo agregar un dump

1. Coloca tu archivo `.sql` en el directorio `db/init/`
2. Ejecuta `docker-compose up -d db` (o recrea los contenedores)
3. Los scripts se ejecutarán en orden alfabético

### Notas importantes

- ⚠️ Los scripts **solo se ejecutan la primera vez** (volumen vacío)
- Para re-ejecutar, elimina el volumen: `docker volume rm aws-mvp-app_db-data`
- Los scripts se ejecutan como `root`, pueden incluir `CREATE DATABASE` y `CREATE USER`

## Acceso Manual

Para acceder a la base de datos desde fuera del contenedor:

```bash
# Desde el host
mysql -h localhost -P 3306 -u presuflow_user -p presuflow

# Desde dentro de otro contenedor (usando docker exec)
docker exec -it aws-mvp-db mysql -u root -p
```

## Backup y Restauración

### Backup

```bash
docker exec aws-mvp-db mysqldump -u root -p${DB_ROOT_PASSWORD} presuflow > backup.sql
```

### Restauración

```bash
docker exec -i aws-mvp-db mysql -u root -p${DB_ROOT_PASSWORD} presuflow < backup.sql
```

