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

# Detener contenedores viejos
echo -e "${YELLOW}🛑 Deteniendo contenedores...${NC}"
docker compose down 2>/dev/null || true

# Construir y levantar
echo -e "${YELLOW}🔨 Construyendo y levantando...${NC}"
docker compose up -d --build --remove-orphans
docker system prune -f 

echo -e "${YELLOW}⏳ Esperando servicios...${NC}"
sleep 10
docker compose ps

echo -e "${GREEN}✅ Despliegue completado!${NC}"
