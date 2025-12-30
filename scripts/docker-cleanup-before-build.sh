#!/bin/bash

# Script de limpieza agresiva ANTES de construir imágenes
# Este script elimina TODO lo que no sea esencial para liberar máximo espacio
# Uso: ./scripts/docker-cleanup-before-build.sh

set -e

echo "🧹 LIMPIEZA AGRESIVA ANTES DEL BUILD"
echo "===================================="
echo ""

# Mostrar espacio actual
echo "💾 Espacio ANTES de la limpieza:"
df -h / | tail -1
echo ""

# Detener todos los contenedores
echo "🛑 Deteniendo todos los contenedores..."
docker stop $(docker ps -q) 2>/dev/null || true

# Eliminar todos los contenedores
echo "🗑️  Eliminando todos los contenedores..."
docker container rm -f $(docker container ls -aq) 2>/dev/null || true

# Obtener IDs de imágenes que están siendo usadas por docker-compose (si existe)
USED_IMAGES=""
if [ -f docker-compose.yml ]; then
  echo "📋 Detectando imágenes que se usarán en docker-compose..."
  # Extraer nombres de imágenes de docker-compose.yml
  USED_IMAGES=$(grep -E "image:|build:" docker-compose.yml | grep -v "^#" | sed 's/.*image: *//; s/.*build:.*//' | tr '\n' ' ')
fi

# Eliminar todas las imágenes excepto las que se usarán
echo "🗑️  Eliminando imágenes no utilizadas..."
if [ -n "$USED_IMAGES" ]; then
  echo "  (Preservando: $USED_IMAGES)"
  # Eliminar imágenes que no coincidan con las que se usarán
  docker images --format "{{.Repository}}:{{.Tag}} {{.ID}}" | while read img id; do
    PRESERVE=false
    for used in $USED_IMAGES; do
      if echo "$img" | grep -q "$used"; then
        PRESERVE=true
        break
      fi
    done
    if [ "$PRESERVE" = false ]; then
      docker rmi "$id" 2>/dev/null || true
    fi
  done || true
else
  # Si no podemos determinar qué preservar, eliminar todas las imágenes no usadas
  docker image prune -a -f
fi

# Limpiar build cache completamente
echo "🗑️  Eliminando build cache..."
docker builder prune -a -f

# Limpiar volúmenes huérfanos (CUIDADO: no elimina volúmenes con nombre como db-data)
echo "🗑️  Limpiando volúmenes huérfanos..."
docker volume prune -f

# Limpieza completa del sistema
echo "🗑️  Limpieza completa del sistema..."
docker system prune -a --volumes -f

# Mostrar espacio después
echo ""
echo "💾 Espacio DESPUÉS de la limpieza:"
df -h / | tail -1
echo ""

# Mostrar imágenes restantes
echo "📊 Imágenes restantes:"
docker images
echo ""

echo "✅ Limpieza completada"
