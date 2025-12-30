#!/bin/bash

# Script de limpieza de emergencia de Docker
# Usar cuando el VPS se quede sin espacio
# Uso: ./scripts/docker-cleanup-emergency.sh

set -e

echo "🧹 LIMPIEZA DE EMERGENCIA DE DOCKER"
echo "===================================="
echo ""

# Mostrar espacio actual
echo "💾 Espacio disponible ANTES de la limpieza:"
df -h / | tail -1
echo ""

# Detener todos los contenedores
echo "🛑 Deteniendo todos los contenedores..."
docker stop $(docker ps -aq) 2>/dev/null || true

# Eliminar todos los contenedores detenidos
echo "🗑️  Eliminando contenedores detenidos..."
docker container prune -a -f

# Eliminar todas las imágenes no utilizadas
echo "🗑️  Eliminando imágenes no utilizadas..."
docker image prune -a -f

# Limpiar build cache
echo "🗑️  Limpiando build cache..."
docker builder prune -a -f

# Limpiar volúmenes no utilizados (CUIDADO: esto elimina volúmenes no usados)
echo "🗑️  Limpiando volúmenes no utilizados..."
docker volume prune -f

# Limpieza completa del sistema
echo "🗑️  Limpieza completa del sistema..."
docker system prune -a --volumes -f

# Mostrar espacio después
echo ""
echo "💾 Espacio disponible DESPUÉS de la limpieza:"
df -h / | tail -1
echo ""

# Mostrar imágenes y contenedores restantes
echo "📊 Estado actual:"
echo "Imágenes:"
docker images
echo ""
echo "Contenedores:"
docker ps -a
echo ""

echo "✅ Limpieza completada"
