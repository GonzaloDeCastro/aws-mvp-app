#!/bin/bash

# Script para limpiar recursos de Docker no utilizados
# Uso: ./scripts/docker-cleanup.sh

set -e

echo "🧹 Limpiando recursos de Docker..."

# Mostrar uso de disco antes
echo ""
echo "📊 Uso de disco ANTES:"
docker system df

echo ""
echo "🗑️  Eliminando contenedores detenidos..."
docker container prune -f

echo ""
echo "🗑️  Eliminando imágenes no utilizadas (sin etiquetas)..."
docker image prune -f

echo ""
echo "🗑️  Eliminando volúmenes no utilizados..."
docker volume prune -f

echo ""
echo "🗑️  Eliminando redes no utilizadas..."
docker network prune -f

echo ""
echo "🗑️  Eliminando build cache..."
docker builder prune -f

echo ""
echo "📊 Uso de disco DESPUÉS:"
docker system df

echo ""
echo "✅ Limpieza completada!"

# Opcional: Limpiar todo (comentado por seguridad)
# echo "⚠️  ¿Deseas eliminar TODAS las imágenes no utilizadas (incluyendo las etiquetadas)?"
# echo "Ejecuta manualmente: docker image prune -a -f"

