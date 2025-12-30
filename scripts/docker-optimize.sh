#!/bin/bash

# Script para optimizar imágenes de Docker
# Uso: ./scripts/docker-optimize.sh

set -e

echo "🔧 Optimizando imágenes de Docker..."

# Reconstruir imágenes sin cache para asegurar que están optimizadas
echo ""
echo "🔨 Reconstruyendo imágenes sin cache..."
docker-compose build --no-cache

echo ""
echo "📊 Tamaño de imágenes:"
docker images | grep -E "aws-mvp-app|mysql|nginx" | awk '{printf "%-50s %10s\n", $1":"$2, $7}'

echo ""
echo "✅ Optimización completada!"
echo ""
echo "💡 Consejos adicionales:"
echo "  - Usa 'docker system prune' regularmente para limpiar recursos"
echo "  - Considera usar 'docker system df' para monitorear el uso de disco"
echo "  - Los volúmenes de datos (db-data) se mantienen para preservar la base de datos"

