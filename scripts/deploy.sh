#!/bin/bash

# Script de despliegue para ejecutar manualmente en EC2
# Uso: ./scripts/deploy.sh

set -e

echo "🚀 Iniciando despliegue..."

# Ir al directorio del proyecto
cd ~/aws-mvp-app || { echo "❌ Error: Directorio ~/aws-mvp-app no encontrado"; exit 1; }

# Pull de cambios (si usas git en EC2)
if [ -d .git ]; then
  echo "📥 Actualizando código desde Git..."
  git pull origin main || echo "⚠️ No se pudo hacer git pull, continuando..."
fi

# Exportar variables de entorno
export VITE_API_BASE_URL=${VITE_API_BASE_URL:-http://localhost:3001}

# Construir y levantar servicios
echo "🐳 Construyendo imágenes Docker..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "▶️  Levantando servicios..."
docker-compose -f docker-compose.prod.yml up -d

# Limpiar imágenes antiguas
echo "🧹 Limpiando imágenes antiguas..."
docker image prune -f

# Esperar a que los servicios inicien
echo "⏳ Esperando a que los servicios inicien..."
sleep 10

# Verificar estado
echo "📊 Estado de los servicios:"
docker-compose -f docker-compose.prod.yml ps

# Health check
echo "🏥 Verificando health check..."
sleep 5
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
  echo "✅ Backend saludable"
else
  echo "⚠️  Backend no responde al health check"
fi

echo "✅ Despliegue completado"
