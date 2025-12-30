# Guía de Solución de Problemas de Deploy

## Error: "no space left on device" (ENOSPC)

Este error ocurre cuando el VPS se queda sin espacio en disco durante el build de Docker.

### Solución Rápida

Ejecuta el script de limpieza de emergencia ANTES del deploy:

```bash
cd ~/aws-mvp-app
chmod +x scripts/docker-cleanup-emergency.sh
./scripts/docker-cleanup-emergency.sh
```

Luego ejecuta el deploy normal:

```bash
./deploy.sh
```

### Solución Preventiva

El script `deploy.sh` ya incluye limpieza automática antes del build. Si aún así se queda sin espacio:

1. **Verificar espacio disponible:**
   ```bash
   df -h /
   ```
   Necesitas al menos **500MB libres** para un build exitoso.

2. **Limpieza manual adicional:**
   ```bash
   # Ver qué está ocupando espacio
   docker system df
   
   # Limpieza agresiva (elimina TODO excepto contenedores corrientes)
   docker stop $(docker ps -q) 2>/dev/null || true
   docker container rm -f $(docker container ls -aq) 2>/dev/null || true
   docker image prune -a -f
   docker builder prune -a -f
   docker volume prune -f
   docker system prune -a -f
   ```

3. **Si el problema persiste:**
   - Considera aumentar el tamaño del disco del VPS
   - O mover el proyecto a un VPS con más espacio
   - O usar un servicio de CI/CD externo (como GitHub Actions) que construya las imágenes y luego las suba a un registry

### Verificar Espacio Durante el Build

Para monitorear el espacio durante el build, puedes ejecutar en otra terminal:

```bash
watch -n 2 'df -h /'
```

## Error: "Docker Compose is configured to build using Bake, but buildx isn't installed"

Este es solo un warning, no un error crítico. El build funcionará con el builder por defecto.

Si quieres eliminar el warning, instala buildx:

```bash
docker buildx version || {
  mkdir -p ~/.docker/cli-plugins
  curl -SL https://github.com/docker/buildx/releases/latest/download/buildx-linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
  chmod +x ~/.docker/cli-plugins/docker-buildx
}
```

## Optimización de Espacio

### Durante el Build

El Dockerfile del frontend usa cache mounts de BuildKit (si está disponible) para reducir el espacio usado durante el build. Los cache mounts almacenan el cache de npm fuera del contenedor.

### Después del Build

El script `deploy.sh` limpia automáticamente imágenes huérfanas después del build para liberar espacio.

### Configuración Recomendada

- **Mínimo de espacio libre:** 500MB
- **Recomendado:** 1GB+ de espacio libre
- **Swap:** Si tienes swap configurado, puede ayudar durante picos de uso

## Verificar Estado del Deploy

Después del deploy, verifica que todo esté funcionando:

```bash
# Ver estado de los contenedores
docker compose ps

# Ver logs
docker compose logs -f

# Health check
curl http://localhost:3001/health
```

