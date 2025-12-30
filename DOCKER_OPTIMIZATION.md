# Optimización de Docker para VPS con recursos limitados

Este documento describe las optimizaciones aplicadas para reducir el uso de memoria y espacio en disco en tu VPS.

## 🎯 Optimizaciones Aplicadas

### 1. Límites de Memoria en Docker Compose

Se agregaron límites de memoria a cada servicio para prevenir que consuman más recursos de los necesarios:

- **MySQL (db)**: Máximo 512MB, reservado 256MB
- **Backend**: Máximo 512MB, reservado 256MB  
- **Frontend**: Máximo 256MB, reservado 128MB

**Total máximo**: ~1.25GB de RAM (dejando espacio para el sistema operativo)

### 2. Limpieza de Cache de npm

Los Dockerfiles ahora limpian el cache de npm después de instalar dependencias, ahorrando espacio:

```dockerfile
RUN npm ci --no-audit --no-fund && npm cache clean --force
```

### 3. Optimización del Build del Frontend

El build del frontend elimina `node_modules` después de compilar, ya que solo se necesitan los archivos estáticos en producción:

```dockerfile
RUN npm run build && rm -rf node_modules && npm cache clean --force
```

### 4. .dockerignore Optimizado

Se mejoraron los archivos `.dockerignore` para excluir:
- `node_modules` (se instalan en el contenedor)
- Archivos de entorno (`.env*`)
- Archivos de desarrollo (`.vscode`, `.idea`)
- Documentación y logs
- Archivos de build locales

### 5. Scripts de Limpieza

Se agregaron scripts para mantener el sistema limpio:

#### Limpieza Rápida (`scripts/docker-cleanup.sh`)
```bash
bash scripts/docker-cleanup.sh
```

Elimina:
- Contenedores detenidos
- Imágenes sin etiquetas
- Volúmenes no utilizados (⚠️ cuidado: excluye volúmenes con datos)
- Redes no utilizadas
- Build cache

#### Reconstrucción Optimizada (`scripts/docker-optimize.sh`)
```bash
bash scripts/docker-optimize.sh
```

Reconstruye las imágenes sin cache para asegurar que están optimizadas.

## 📊 Monitoreo de Uso

### Ver uso de disco de Docker
```bash
docker system df
```

### Ver uso de memoria de contenedores
```bash
docker stats
```

### Ver tamaño de imágenes
```bash
docker images | grep -E "aws-mvp-app|mysql|nginx"
```

## 🧹 Limpieza Manual

### Limpieza completa (⚠️ Cuidado: elimina todo lo no utilizado)
```bash
# Limpiar todo excepto volúmenes con datos
docker system prune -f

# Limpiar TODO incluyendo imágenes etiquetadas (⚠️ peligroso)
docker system prune -a -f

# Limpiar solo build cache (seguro)
docker builder prune -f
```

### Limpiar imágenes específicas
```bash
# Ver imágenes
docker images

# Eliminar imagen específica
docker rmi <image_id>
```

### Limpiar volúmenes (⚠️ CUIDADO: elimina datos)
```bash
# Ver volúmenes
docker volume ls

# Eliminar volumen específico (solo si estás seguro)
docker volume rm <volume_name>
```

## 💡 Mejores Prácticas

1. **Ejecuta limpieza regularmente**:
   ```bash
   # Semanal o después de cada deploy
   bash scripts/docker-cleanup.sh
   ```

2. **Monitorea el uso de memoria**:
   ```bash
   # Ver uso en tiempo real
   docker stats
   ```

3. **Limpia build cache después de builds grandes**:
   ```bash
   docker builder prune -f
   ```

4. **No elimines el volumen `db-data`** a menos que quieras perder los datos de la base de datos.

5. **Usa el swap file** (ya configurado) para situaciones donde la memoria se agote temporalmente.

## 📈 Tamaños Esperados de Imágenes

Después de las optimizaciones, los tamaños aproximados deberían ser:

- **mysql:8.0**: ~500MB
- **Backend (Node Alpine)**: ~150-200MB
- **Frontend (Nginx Alpine)**: ~50-100MB

**Total aproximado**: ~700-800MB de imágenes

## 🔍 Troubleshooting

### Si el contenedor no inicia por falta de memoria:

1. Verifica el swap:
   ```bash
   free -h
   swapon --show
   ```

2. Ajusta los límites en `docker-compose.yml` si es necesario.

3. Considera reducir los límites si tu VPS tiene menos de 2GB de RAM.

### Si el disco se llena:

1. Limpia recursos de Docker:
   ```bash
   bash scripts/docker-cleanup.sh
   ```

2. Verifica qué está ocupando espacio:
   ```bash
   docker system df -v
   du -sh /var/lib/docker/*
   ```

3. Considera mover Docker a otro disco/montaje si es posible.

