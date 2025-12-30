#!/bin/bash

# Script de despliegue para ejecutar manualmente en EC2
# Uso: ./scripts/deploy.sh

set -e

echo "🚀 Iniciando despliegue..."

# Ir al directorio del proyecto
cd ~/aws-mvp-app || { echo "❌ Error: Directorio ~/aws-mvp-app no encontrado"; exit 1; }

# Verificar espacio disponible ANTES de empezar
echo "💾 Espacio disponible antes de iniciar:"
df -h / | tail -1

# Pull de cambios (si usas git en EC2)
if [ -d .git ]; then
  echo "📥 Actualizando código desde Git..."
  git pull origin main || echo "⚠️ No se pudo hacer git pull, continuando..."
fi

# Exportar variables de entorno
export VITE_API_BASE_URL=${VITE_API_BASE_URL:-http://localhost:3001}

# Detener contenedores existentes
echo "🛑 Deteniendo contenedores..."
docker compose down 2>/dev/null || true

# Limpiar espacio ANTES del build (crítico para VPS con espacio limitado)
echo "🧹 Limpiando espacio de Docker ANTES del build..."

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

# Verificar espacio disponible después de limpiar
echo "💾 Espacio disponible después de limpiar:"
df -h / | tail -1

# Construir y levantar servicios (usar BuildKit si está disponible)
echo "🔨 Construyendo y levantando..."
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
docker compose up -d --build

# Limpiar imágenes huérfanas después del build
echo "🧹 Limpiando imágenes huérfanas después del build..."
docker image prune -f 2>/dev/null || true

# Esperar a que los servicios inicien
echo "⏳ Esperando a que los servicios inicien..."
sleep 10

# Verificar estado
echo "📊 Estado de los servicios:"
docker compose ps

# Health check
echo "🏥 Verificando health check..."
sleep 5
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
  echo "✅ Backend saludable"
else
  echo "⚠️  Backend no responde al health check"
fi

echo "✅ Despliegue completado"
