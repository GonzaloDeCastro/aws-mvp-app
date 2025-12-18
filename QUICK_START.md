# ⚡ Inicio Rápido - EC2 con Azure MySQL

Guía rápida para desplegar en EC2 con base de datos en Azure.

## 🚀 Pasos Rápidos

### 1. Instalar Docker en EC2

```bash
sudo yum install docker -y
sudo systemctl start docker
sudo usermod -aG docker ec2-user
newgrp docker
```

### 2. Configurar Variables de Entorno

#### Backend (`backend/.env.production`):

```env
NODE_ENV=production
PORT=3001
DB_HOST=tu-servidor-azure.mysql.database.azure.com
DB_PORT=3306
DB_USER=gonzalo
DB_PASSWORD=NuevaPasswordSegura123!
DB_NAME=presuflow
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=presuflow_super_secret_change_this
JWT_EXPIRES_IN=1d
```

**⚠️ IMPORTANTE:** Reemplaza `tu-servidor-azure.mysql.database.azure.com` con la URL real de tu servidor Azure MySQL.

#### Frontend (archivo `.env` en la raíz):

```env
VITE_API_BASE_URL=http://18.191.152.129:3001
```

**⚠️ IMPORTANTE:**

- Sin espacios
- Sin `/api` al final
- Reemplaza `18.191.152.129` con la IP pública de tu EC2

### 3. Construir y Levantar

```bash
# Clonar repositorio (si no lo tienes)
git clone <tu-repo>
cd aws-mvp-app

# Crear archivo de variables del backend
nano backend/.env.production
# Pega las variables y guarda (Ctrl+X, Y, Enter)

# Crear archivo de variables del frontend
echo "VITE_API_BASE_URL=http://18.191.152.129:3001" > .env

# Construir y levantar
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 4. Verificar

```bash
# Health check del backend
curl http://localhost:3001/health

# Debería responder: {"ok":true}
```

Abre en tu navegador: `http://18.191.152.129:5173`

## 🔒 Configurar Security Groups

En AWS Console, abre estos puertos en el Security Group de tu EC2:

- **3001** (Backend API) - Solo si accedes directamente
- **5173** (Frontend) - Solo si accedes directamente
- **22** (SSH)
- **80/443** (Si usas Nginx)

## 📚 Más Información

- Configuración detallada: [ENV_SETUP.md](./ENV_SETUP.md)
- Guía completa de Docker: [DOCKER.md](./DOCKER.md)
