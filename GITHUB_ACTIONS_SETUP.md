# 🚀 Configuración de GitHub Actions para AWS EC2

Esta guía te ayudará a configurar el despliegue automático desde GitHub a AWS EC2 usando GitHub Actions.

## 📋 Prerrequisitos

1. ✅ Repositorio en GitHub
2. ✅ Instancia EC2 configurada con Docker y Docker Compose
3. ✅ Acceso SSH a la instancia EC2
4. ✅ Archivo `.env.production` configurado en EC2

## 🔧 Paso 1: Preparar EC2

### 1.1 Instalar Docker y Docker Compose

#### Para Amazon Linux (ec2-user):

```bash
# Conectar a EC2
ssh -i tu-key.pem ec2-user@tu-ip-ec2

# Instalar Docker
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reiniciar sesión
exit
ssh -i tu-key.pem ec2-user@tu-ip-ec2
```

#### Para Ubuntu (ubuntu):

```bash
# Conectar a EC2
ssh -i tu-key.pem ubuntu@tu-ip-ec2

# Actualizar sistema
sudo apt-get update -y

# Instalar dependencias
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Agregar clave GPG oficial de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Configurar repositorio
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Agregar usuario al grupo docker
sudo usermod -aG docker ubuntu

# Iniciar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Instalar Docker Compose standalone (si prefieres la versión standalone)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reiniciar sesión para aplicar cambios de grupo
exit
ssh -i tu-key.pem ubuntu@tu-ip-ec2

# Verificar instalación
docker --version
docker compose version
```

### 1.2 Crear directorio del proyecto

```bash
mkdir -p ~/aws-mvp-app
cd ~/aws-mvp-app
```

### 1.3 Crear archivo de variables de entorno

Crea `backend/.env.production` en EC2:

```bash
nano ~/aws-mvp-app/backend/.env.production
```

Contenido:

```env
NODE_ENV=production
PORT=3001
DB_HOST=tu-host-mysql
DB_PORT=3306
DB_USER=tu-usuario
DB_PASSWORD=tu-password
DB_NAME=presuflow
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=tu-secreto-jwt
JWT_EXPIRES_IN=1d
```

### 1.4 Crear archivo .env en la raíz (para docker-compose)

```bash
nano ~/aws-mvp-app/.env
```

```env
VITE_API_BASE_URL=http://tu-ip-ec2:3001
```

## 🔐 Paso 2: Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Agrega los siguientes secrets:

### Secrets Requeridos

| Secret Name         | Descripción                                | Ejemplo                                       |
| ------------------- | ------------------------------------------ | --------------------------------------------- |
| `EC2_HOST`          | IP pública o dominio de tu EC2             | `18.191.152.129`                              |
| `EC2_USER`          | Usuario SSH de EC2                         | `ubuntu` (Ubuntu) o `ec2-user` (Amazon Linux) |
| `EC2_SSH_KEY`       | Contenido completo de tu clave privada SSH | Contenido de `tu-key.pem`                     |
| `VITE_API_BASE_URL` | URL base de la API para el frontend        | `http://18.191.152.129:3001`                  |

### Cómo obtener EC2_SSH_KEY

```bash
# En tu máquina local, muestra el contenido de tu clave privada
cat tu-key.pem

# Copia TODO el contenido (incluyendo -----BEGIN RSA PRIVATE KEY----- y -----END RSA PRIVATE KEY-----)
# Pégalo completo en el secret EC2_SSH_KEY
```

**⚠️ IMPORTANTE:**

- No compartas tu clave privada públicamente
- Solo agrega el contenido completo de la clave, no el archivo
- Asegúrate de incluir las líneas de inicio y fin

## 🔄 Paso 3: Configurar el Workflow

El workflow ya está creado en `.github/workflows/deploy.yml`. Solo necesitas:

1. **Hacer commit y push** del workflow a tu repositorio
2. El workflow se ejecutará automáticamente cuando hagas push a `main`

## 🚀 Paso 4: Probar el Despliegue

### Opción 1: Push a main (automático)

```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push origin main
```

### Opción 2: Ejecutar manualmente

1. Ve a tu repositorio en GitHub
2. Click en **Actions**
3. Selecciona el workflow **Deploy to AWS EC2**
4. Click en **Run workflow** → **Run workflow**

## 📊 Monitorear el Despliegue

1. Ve a **Actions** en tu repositorio
2. Click en el workflow que está corriendo
3. Verás los logs en tiempo real de cada paso

## 🐛 Troubleshooting

### Error: "Permission denied (publickey)"

**Causa:** La clave SSH no está configurada correctamente.

**Solución:**

1. Verifica que `EC2_SSH_KEY` contenga la clave completa
2. Verifica que `EC2_USER` sea correcto (`ec2-user` para Amazon Linux, `ubuntu` para Ubuntu)
3. Verifica que la clave tenga permisos correctos en EC2

### Error: "Cannot connect to Docker daemon"

**Causa:** Docker no está corriendo o el usuario no tiene permisos.

**Solución en EC2:**

```bash
sudo systemctl start docker
sudo usermod -aG docker $USER
newgrp docker
```

### Error: "docker-compose: command not found"

**Causa:** Docker Compose no está instalado.

**Solución:**

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Error: "Missing env var: DB_HOST"

**Causa:** El archivo `.env.production` no existe o está mal configurado.

**Solución:**

1. Verifica que `backend/.env.production` exista en EC2
2. Verifica que tenga todas las variables requeridas
3. Verifica que no tenga espacios alrededor del `=`

### El despliegue funciona pero el sitio no carga

1. **Verifica Security Groups:**

   - Puerto 3001 (Backend) debe estar abierto
   - Puerto 5173 (Frontend) debe estar abierto
   - Puerto 22 (SSH) debe estar abierto

2. **Verifica que los servicios estén corriendo:**

   ```bash
   ssh -i tu-key.pem ec2-user@tu-ip-ec2
   cd ~/aws-mvp-app
   docker-compose -f docker-compose.prod.yml ps
   ```

3. **Verifica logs:**
   ```bash
   docker-compose -f docker-compose.prod.yml logs -f
   ```

## 🔒 Seguridad

### Recomendaciones

1. **No commits archivos `.env`** - Ya están en `.gitignore`
2. **Usa secrets de GitHub** - Nunca hardcodees credenciales
3. **Rota las claves SSH** periódicamente
4. **Limita acceso SSH** en Security Groups solo a tu IP
5. **Usa IAM roles** en lugar de claves de acceso si es posible

### Mejores Prácticas

- Usa un usuario específico para despliegues (no root)
- Configura rate limiting en GitHub Actions si es necesario
- Monitorea los logs de despliegue regularmente
- Ten un plan de rollback (el workflow puede revertirse manualmente)

## 📝 Estructura del Proyecto en EC2

Después del primer despliegue, tu EC2 tendrá:

```
~/aws-mvp-app/
├── backend/
│   └── .env.production    # Variables de entorno (no se sobrescribe)
├── .env                   # Variables para docker-compose (no se sobrescribe)
├── docker-compose.prod.yml
├── docker-compose.yml
├── backend/
├── frontend/
└── ... (resto del código)
```

## 🔄 Actualizar Variables de Entorno

Si necesitas cambiar variables después del despliegue:

1. **Edita directamente en EC2:**

   ```bash
   ssh -i tu-key.pem ec2-user@tu-ip-ec2
   nano ~/aws-mvp-app/backend/.env.production
   # Edita las variables
   docker-compose -f docker-compose.prod.yml restart backend
   ```

2. **O agrega un paso al workflow** para actualizar variables desde secrets

## 📚 Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
