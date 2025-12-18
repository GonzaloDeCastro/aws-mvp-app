# 🚀 Primer Despliegue - Guía Paso a Paso

Guía completa para hacer tu primer despliegue y probarlo.

## 📋 Checklist Pre-Despliegue

### ✅ En EC2 (ya deberías tenerlo):

- [ ] Docker instalado (`docker --version`)
- [ ] Docker Compose instalado (`docker compose version`)
- [ ] Directorio `~/aws-mvp-app/backend` creado
- [ ] Archivo `backend/.env.production` creado con tus variables
- [ ] Archivo `.env` creado con `VITE_API_BASE_URL=http://18.191.152.129:3001`

### ✅ En GitHub:

- [ ] Secret `EC2_HOST` = `18.191.152.129`
- [ ] Secret `EC2_USER` = `ubuntu`
- [ ] Secret `EC2_SSH_KEY` = contenido completo de `ingClaveGdc.pem`
- [ ] Secret `VITE_API_BASE_URL` = `http://18.191.152.129:3001`

---

## 🚀 Paso 1: Hacer Commit y Push

### En tu máquina local:

```bash
# 1. Verificar que estás en la rama main
git branch

# Si no estás en main:
git checkout main

# 2. Agregar todos los cambios
git add .

# 3. Hacer commit con un mensaje descriptivo
git commit -m "Initial deployment setup with GitHub Actions"

# O si prefieres algo más específico:
git commit -m "Add CI/CD pipeline for AWS EC2 deployment"

# 4. Push a GitHub
git push origin main
```

**Eso es todo.** GitHub Actions se activará automáticamente.

---

## 📊 Paso 2: Monitorear el Despliegue

### En GitHub:

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions** (arriba)
3. Verás el workflow **"Deploy to AWS EC2"** ejecutándose
4. Click en el workflow para ver los logs en tiempo real

### Qué esperar:

- ✅ Checkout code - Descarga el código
- ✅ Configure SSH - Configura conexión SSH
- ✅ Copy files to EC2 - Sincroniza código a EC2
- ✅ Deploy on EC2 - Construye y levanta servicios
- ✅ Health Check - Verifica que el backend responda

**Tiempo estimado:** 3-5 minutos

---

## ✅ Paso 3: Verificar que Funcionó

### Opción 1: Ver logs en GitHub Actions

Al final del workflow deberías ver:

```
✅ Despliegue completado
```

### Opción 2: Verificar en EC2

```bash
# Conectar a EC2
ssh -i ingClaveGdc.pem ubuntu@18.191.152.129

# Ver estado de los contenedores
cd ~/aws-mvp-app
docker compose -f docker-compose.prod.yml ps

# Deberías ver:
# - aws-mvp-backend (Up)
# - aws-mvp-frontend (Up)

# Ver logs
docker compose -f docker-compose.prod.yml logs -f
```

---

## 🌐 Paso 4: Probar la Aplicación

### Backend (API)

**Health Check:**

```bash
curl http://18.191.152.129:3001/health
```

Debería responder:

```json
{ "ok": true }
```

**Desde el navegador:**

```
http://18.191.152.129:3001/health
```

### Frontend

**Abrir en el navegador:**

```
http://18.191.152.129:5173
```

Deberías ver tu aplicación React funcionando.

---

## 🔒 Paso 5: Verificar Security Groups

Si no puedes acceder, verifica los Security Groups en AWS:

1. Ve a AWS Console → EC2 → Security Groups
2. Selecciona el Security Group de tu instancia
3. Verifica que estos puertos estén abiertos:

| Puerto | Protocolo | Origen    | Descripción |
| ------ | --------- | --------- | ----------- |
| 3001   | TCP       | 0.0.0.0/0 | Backend API |
| 5173   | TCP       | 0.0.0.0/0 | Frontend    |
| 22     | TCP       | Tu IP     | SSH         |

**Para abrir un puerto:**

- Click en **Inbound rules** → **Edit inbound rules**
- **Add rule**
- Tipo: Custom TCP
- Puerto: 3001 (o 5173)
- Origen: 0.0.0.0/0 (o tu IP específica)
- **Save rules**

---

## 🐛 Troubleshooting

### El workflow falla en "Copy files to EC2"

**Error:** "Permission denied" o "Connection refused"

**Solución:**

1. Verifica que `EC2_SSH_KEY` tenga el contenido completo de la clave
2. Verifica que `EC2_USER` sea `ubuntu`
3. Verifica que `EC2_HOST` sea `18.191.152.129`
4. Verifica que el Security Group permita SSH (puerto 22) desde GitHub Actions

### El workflow falla en "Deploy on EC2"

**Error:** "docker-compose: command not found"

**Solución en EC2:**

```bash
# Verificar que docker compose funcione
docker compose version

# Si no funciona, instalar standalone
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Actualizar workflow:** Cambiar `docker-compose` por `docker compose` en el workflow.

### No puedo acceder desde el navegador

**Error:** "This site can't be reached" o timeout

**Solución:**

1. Verifica Security Groups (ver Paso 5 arriba)
2. Verifica que los servicios estén corriendo:
   ```bash
   ssh -i ingClaveGdc.pem ubuntu@18.191.152.129
   docker compose -f docker-compose.prod.yml ps
   ```
3. Verifica logs por errores:
   ```bash
   docker compose -f docker-compose.prod.yml logs backend
   docker compose -f docker-compose.prod.yml logs frontend
   ```

### El backend no se conecta a la base de datos

**Error en logs:** "Cannot connect to MySQL"

**Solución:**

1. Verifica que `backend/.env.production` tenga las credenciales correctas
2. Verifica que el firewall de MySQL permita conexiones desde EC2
3. Verifica que `DB_HOST` sea la IP correcta de MySQL

---

## 📝 Comandos Útiles Post-Despliegue

### Ver logs en tiempo real

```bash
ssh -i ingClaveGdc.pem ubuntu@18.191.152.129
cd ~/aws-mvp-app
docker compose -f docker-compose.prod.yml logs -f
```

### Reiniciar servicios

```bash
docker compose -f docker-compose.prod.yml restart
```

### Ver estado de servicios

```bash
docker compose -f docker-compose.prod.yml ps
```

### Detener servicios

```bash
docker compose -f docker-compose.prod.yml down
```

### Reconstruir después de cambios

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 🔄 Próximos Despliegues

Después del primer despliegue, cada vez que hagas:

```bash
git add .
git commit -m "Descripción de tus cambios"
git push origin main
```

GitHub Actions automáticamente:

1. ✅ Sincroniza el código nuevo
2. ✅ Reconstruye las imágenes Docker
3. ✅ Reinicia los servicios
4. ✅ Tu aplicación se actualiza

**Sin intervención manual necesaria.** 🎉

---

## ✅ Resumen

1. **Commit y push:**

   ```bash
   git add .
   git commit -m "Initial deployment setup"
   git push origin main
   ```

2. **Monitorear en GitHub Actions**

3. **Probar:**

   - Backend: `http://18.191.152.129:3001/health`
   - Frontend: `http://18.191.152.129:5173`

4. **Si no funciona:** Verifica Security Groups y logs

¡Listo para desplegar! 🚀
