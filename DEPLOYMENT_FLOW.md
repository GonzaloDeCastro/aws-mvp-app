# 🔄 Flujo de Despliegue Completo

Explicación de cómo funciona el despliegue automático desde GitHub a AWS EC2.

## 🎯 Objetivo

**Cuando hagas `git push` a GitHub → Automáticamente se despliega en EC2**

## 📊 Dos Opciones de Despliegue

### Opción A: GitHub Actions sincroniza directamente (Recomendada) ✅

**Cómo funciona:**

1. Haces `git push` a GitHub
2. GitHub Actions se activa automáticamente
3. GitHub Actions se conecta a EC2 vía SSH
4. GitHub Actions copia el código directamente a EC2 usando `rsync`
5. GitHub Actions ejecuta `docker-compose up` en EC2
6. ✅ Listo, tu aplicación está desplegada

**Ventajas:**

- ✅ No necesitas Git en EC2
- ✅ Más rápido (rsync es eficiente)
- ✅ Más seguro (no necesitas credenciales de Git en EC2)
- ✅ El código siempre está sincronizado

**Setup necesario:**

- Solo crear los archivos `.env` en EC2 (como te expliqué antes)
- Configurar secrets en GitHub
- Listo

---

### Opción B: Clonar repositorio en EC2

**Cómo funciona:**

1. Clonas el repo en EC2 una vez
2. Haces `git push` a GitHub
3. GitHub Actions se conecta a EC2
4. GitHub Actions hace `git pull` en EC2
5. GitHub Actions ejecuta `docker-compose up`
6. ✅ Listo

**Ventajas:**

- ✅ Tienes el código completo en EC2
- ✅ Puedes hacer cambios manuales si es necesario

**Desventajas:**

- ❌ Necesitas Git en EC2
- ❌ Necesitas configurar credenciales de Git
- ❌ Más pasos de configuración

---

## 🚀 Recomendación: Opción A (Sincronización Directa)

Te recomiendo la **Opción A** porque es más simple y segura. El workflow ya está configurado para esto.

### Setup en EC2 (Solo una vez)

```bash
# Conectar a EC2
ssh -i tu-key.pem ubuntu@tu-ip-ec2

# 1. Crear directorio del proyecto
mkdir -p ~/aws-mvp-app/backend
cd ~/aws-mvp-app

# 2. Crear archivo de variables del backend
nano backend/.env.production
```

Pega tus variables:

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

```bash
# 3. Crear archivo .env para docker-compose
nano .env
```

```env
VITE_API_BASE_URL=http://TU-IP-EC2:3001
```

**Eso es todo.** No necesitas clonar nada.

---

## 🔄 Flujo Completo Paso a Paso

### 1. Setup Inicial (Solo una vez)

**En tu máquina local:**

```bash
# Hacer cambios en tu código
git add .
git commit -m "Mi cambio"
git push origin main
```

**En GitHub:**

- Configurar secrets (EC2_HOST, EC2_USER, EC2_SSH_KEY, VITE_API_BASE_URL)

**En EC2:**

- Crear solo los archivos `.env` (como arriba)

### 2. Despliegue Automático (Cada push)

**Cuando haces push:**

1. GitHub Actions detecta el push
2. Se conecta a EC2 vía SSH
3. Copia todo el código nuevo a `~/aws-mvp-app/`
4. Ejecuta `docker-compose -f docker-compose.prod.yml up -d --build`
5. Tu aplicación se actualiza automáticamente

**No necesitas hacer nada más.** 🎉

---

## 🔧 Si Prefieres Clonar (Opción B)

Si realmente quieres clonar el repositorio en EC2:

### Paso 1: Clonar repositorio

```bash
# Conectar a EC2
ssh -i tu-key.pem ubuntu@tu-ip-ec2

# Clonar repositorio
cd ~
git clone https://github.com/tu-usuario/aws-mvp-app.git
cd aws-mvp-app
```

### Paso 2: Crear archivos de configuración

```bash
# Backend
nano backend/.env.production
# Pega las variables de entorno

# Docker Compose
nano .env
# Pega VITE_API_BASE_URL
```

### Paso 3: Modificar el workflow de GitHub Actions

Necesitarías cambiar el workflow para que haga `git pull` en lugar de `rsync`. Pero esto es más complicado y menos recomendado.

---

## ✅ Resumen

**Para tu caso (despliegue automático):**

1. ✅ **NO necesitas clonar** el repositorio en EC2
2. ✅ **Solo crea** los archivos `.env` en EC2
3. ✅ **Configura secrets** en GitHub
4. ✅ **Haz push** a GitHub
5. ✅ **GitHub Actions** se encarga del resto automáticamente

**Cada vez que hagas `git push`:**

- ✅ El código se sincroniza automáticamente
- ✅ La aplicación se reconstruye y reinicia
- ✅ Todo funciona sin intervención manual

---

## 🐛 Troubleshooting

### "No se encuentra el directorio ~/aws-mvp-app"

**Solución:** Crea el directorio manualmente:

```bash
mkdir -p ~/aws-mvp-app/backend
```

### "Los archivos .env se sobrescriben"

**Solución:** Están excluidos del rsync, pero si pasa, hazlos solo lectura:

```bash
chmod 400 ~/aws-mvp-app/backend/.env.production
chmod 400 ~/aws-mvp-app/.env
```

### "Docker compose no funciona"

**Solución:** En Ubuntu puedes usar:

```bash
docker compose -f docker-compose.prod.yml up -d
# O
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📝 Checklist Final

Antes de hacer el primer push:

- [ ] Archivos `.env` creados en EC2
- [ ] Secrets configurados en GitHub
- [ ] Docker funcionando en EC2 (`docker ps`)
- [ ] Docker Compose funcionando (`docker compose version`)
- [ ] Directorio `~/aws-mvp-app` existe en EC2
- [ ] Código listo para hacer push

**Luego solo haz:**

```bash
git push origin main
```

Y GitHub Actions hará el resto automáticamente. 🚀
