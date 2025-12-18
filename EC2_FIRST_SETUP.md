# 🚀 Primer Setup en EC2 - Ubuntu

Guía para preparar EC2 antes del primer despliegue con GitHub Actions.

## ✅ Ya tienes instalado

- ✅ Docker
- ✅ Git

## 📋 Opción 1: Setup Manual (Recomendado para primer despliegue)

Esta opción te permite crear los archivos de configuración antes del primer despliegue.

### Paso 1: Crear estructura de directorios

```bash
# Conectar a EC2
ssh -i tu-key.pem ubuntu@tu-ip-ec2

# Crear directorio del proyecto
mkdir -p ~/aws-mvp-app/backend
cd ~/aws-mvp-app
```

### Paso 2: Crear archivo de variables del backend

```bash
nano backend/.env.production
```

Pega tus variables de entorno:

```env
NODE_ENV=production
PORT=3001
DB_HOST=18.118.101.4
DB_PORT=3306
DB_USER=gonzalo
DB_PASSWORD=NuevaPasswordSegura123!
DB_NAME=presuflow
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=presuflow_super_secret_change_this
JWT_EXPIRES_IN=1d
```

Guarda con `Ctrl+X`, luego `Y`, luego `Enter`.

### Paso 3: Crear archivo .env para docker-compose

```bash
nano .env
```

```env
VITE_API_BASE_URL=http://tu-ip-ec2:3001
```

**⚠️ IMPORTANTE:** Reemplaza `tu-ip-ec2` con la IP pública de tu EC2.

### Paso 4: Verificar estructura

```bash
cd ~/aws-mvp-app
ls -la
ls -la backend/
```

Deberías ver:

- `backend/.env.production` ✅
- `.env` ✅

### Paso 5: Listo para GitHub Actions

Ahora puedes hacer push a GitHub y el workflow se encargará del resto. Los archivos `.env` y `.env.production` **NO** se sobrescribirán porque están excluidos del rsync.

---

## 📋 Opción 2: Clonar Repositorio (Alternativa)

Si prefieres tener el código completo desde el inicio:

### Paso 1: Clonar repositorio

```bash
cd ~
git clone https://github.com/tu-usuario/aws-mvp-app.git
cd aws-mvp-app
```

### Paso 2: Crear archivos de configuración

```bash
# Backend
nano backend/.env.production
# Pega las variables (igual que en Opción 1)

# Docker Compose
nano .env
# Pega VITE_API_BASE_URL (igual que en Opción 1)
```

### Paso 3: Verificar que los archivos estén en .gitignore

```bash
# Verificar que .env esté en .gitignore
grep -E "^\.env$" .gitignore

# Verificar que .env.production esté en .gitignore
grep -E "^backend/\.env\.production$" .gitignore
```

**⚠️ IMPORTANTE:** Estos archivos NO deben subirse a Git.

---

## 🎯 Recomendación

**Usa la Opción 1** (setup manual). Es más simple porque:

1. ✅ Solo creas los archivos de configuración necesarios
2. ✅ GitHub Actions sincroniza el código automáticamente
3. ✅ Menos pasos, menos errores
4. ✅ Los archivos sensibles nunca se suben a Git

---

## 🔄 Después del Primer Despliegue

Una vez que GitHub Actions haya hecho el primer despliegue:

1. **El código estará en:** `~/aws-mvp-app/`
2. **Los archivos de configuración seguirán ahí:** `backend/.env.production` y `.env`
3. **Cada push a `main` actualizará automáticamente el código** (pero NO los archivos `.env`)

---

## 🐛 Troubleshooting

### Error: "No such file or directory" al crear archivos

**Solución:**

```bash
# Asegúrate de estar en el directorio correcto
cd ~/aws-mvp-app
mkdir -p backend
```

### Error: "Permission denied" al editar archivos

**Solución:**

```bash
# Verifica permisos
ls -la ~/aws-mvp-app
# Si es necesario, ajusta permisos
chmod 755 ~/aws-mvp-app
```

### Los archivos .env se sobrescriben después del despliegue

**Causa:** El rsync de GitHub Actions podría estar sobrescribiendo.

**Solución:** Verifica que los archivos estén excluidos en el workflow (ya están configurados). Si aún se sobrescriben, puedes protegerlos:

```bash
# Hacer los archivos solo lectura (después del primer despliegue)
chmod 400 ~/aws-mvp-app/backend/.env.production
chmod 400 ~/aws-mvp-app/.env
```

---

## ✅ Checklist Pre-Despliegue

Antes de hacer push a GitHub, verifica:

- [ ] Docker instalado y funcionando (`docker --version`)
- [ ] Docker Compose instalado (`docker compose version`)
- [ ] Directorio `~/aws-mvp-app` creado
- [ ] Archivo `backend/.env.production` creado con todas las variables
- [ ] Archivo `.env` creado con `VITE_API_BASE_URL`
- [ ] IP de EC2 correcta en `VITE_API_BASE_URL`
- [ ] Secrets configurados en GitHub (EC2_HOST, EC2_USER, EC2_SSH_KEY, VITE_API_BASE_URL)

---

## 🚀 Siguiente Paso

Una vez completado el setup:

1. Haz commit y push a GitHub
2. El workflow de GitHub Actions se ejecutará automáticamente
3. Monitorea el despliegue en la pestaña **Actions** de GitHub
