#!/bin/bash

# Script de despliegue automático para EC2 (aws-mvp-app)
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de AWS MVP App..."

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Crear .env si no existe (con valores por defecto seguros para dev/test, pero DEBEN ser reemplazados en prod)
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creando archivo .env...${NC}"
    cat > .env << EOF
# DB Configuration
DB_ROOT_PASSWORD=rootpassword
DB_NAME=presuflow
DB_USER=presuflow_user
DB_PASSWORD=presuflow_password

# JWT
JWT_SECRET=change_this_secret_in_production
JWT_EXPIRES_IN=1d

# App
NODE_ENV=production
PORT=3001
VITE_API_BASE_URL=/api
EOF
    echo -e "${GREEN}✅ .env creado. RECUERDA CAMBIAR LAS CONTRASEÑAS.${NC}"
else
    echo -e "${GREEN}✅ .env ya existe${NC}"
fi

# Verificar espacio disponible
echo -e "${YELLOW}💾 Espacio disponible antes de iniciar:${NC}"
df -h / | tail -1

# Detener contenedores viejos
echo -e "${YELLOW}🛑 Deteniendo contenedores...${NC}"
docker compose down 2>/dev/null || true

# Limpiar espacio ANTES del build (crítico para VPS con espacio limitado)
echo -e "${YELLOW}🧹 Limpiando espacio de Docker ANTES del build...${NC}"

# Detener todos los contenedores
docker stop $(docker ps -q) 2>/dev/null || true

# Eliminar todos los contenedores
docker container rm -f $(docker container ls -aq) 2>/dev/null || true

# Eliminar todas las imágenes (se descargarán de nuevo durante el build)
echo "  - Eliminando todas las imágenes..."
docker image prune -a -f 2>/dev/null || true

# Limpiar build cache completamente
echo "  - Eliminando build cache..."
docker builder prune -a -f 2>/dev/null || true

# Limpiar volúmenes huérfanos (preserva volúmenes con nombre)
echo "  - Limpiando volúmenes huérfanos..."
docker volume prune -f 2>/dev/null || true

# Limpieza completa del sistema
echo "  - Limpieza completa del sistema..."
docker system prune -a -f 2>/dev/null || true

# Verificar espacio después de limpiar
echo -e "${YELLOW}💾 Espacio disponible después de limpiar:${NC}"
df -h / | tail -1

# Construir y levantar (usar BuildKit si está disponible para cache mounts)
echo -e "${YELLOW}🔨 Construyendo y levantando...${NC}"
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
docker compose up -d --build --remove-orphans

# Limpiar después del build
echo -e "${YELLOW}🧹 Limpiando imágenes huérfanas después del build...${NC}"
docker image prune -f 2>/dev/null || true 

echo -e "${YELLOW}⏳ Esperando servicios...${NC}"
sleep 10
docker compose ps

echo -e "${GREEN}✅ Despliegue completado!${NC}"
