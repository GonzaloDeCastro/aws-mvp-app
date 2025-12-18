# 🐧 Configuración de EC2 con Ubuntu

Guía rápida para configurar EC2 con Ubuntu para el despliegue.

## 📋 Instalación de Docker en Ubuntu

### Paso 1: Conectar a EC2

```bash
ssh -i tu-key.pem ubuntu@tu-ip-ec2
```

### Paso 2: Actualizar sistema

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

### Paso 3: Instalar Docker

```bash
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

# Instalar Docker Engine
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Agregar usuario al grupo docker
sudo usermod -aG docker ubuntu

# Iniciar y habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### Paso 4: Instalar Docker Compose (versión standalone)

Si prefieres usar `docker-compose` en lugar de `docker compose`:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Paso 5: Reiniciar sesión

```bash
exit
ssh -i tu-key.pem ubuntu@tu-ip-ec2
```

### Paso 6: Verificar instalación

```bash
# Verificar Docker
docker --version

# Verificar Docker Compose (plugin)
docker compose version

# O si instalaste la versión standalone
docker-compose --version

# Verificar que puedes ejecutar Docker sin sudo
docker ps
```

## 🚀 Configurar el Proyecto

### Crear directorio

```bash
mkdir -p ~/aws-mvp-app
cd ~/aws-mvp-app
```

### Crear archivo de variables de entorno

```bash
# Backend
mkdir -p backend
nano backend/.env.production
```

Pega tus variables:

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

```bash
# Variables para docker-compose (en la raíz)
nano .env
```

```env
VITE_API_BASE_URL=http://tu-ip-ec2:3001
```

## 🔧 Comandos Útiles

### Docker Compose

**Nota:** En Ubuntu con Docker Compose Plugin, puedes usar:

```bash
# Opción 1: Plugin (recomendado)
docker compose -f docker-compose.prod.yml up -d

# Opción 2: Standalone (si lo instalaste)
docker-compose -f docker-compose.prod.yml up -d
```

### Ver logs

```bash
docker compose -f docker-compose.prod.yml logs -f
# O
docker-compose -f docker-compose.prod.yml logs -f
```

### Reiniciar servicios

```bash
docker compose -f docker-compose.prod.yml restart
# O
docker-compose -f docker-compose.prod.yml restart
```

## 🐛 Troubleshooting

### Error: "docker: command not found"

**Solución:**

```bash
# Verificar que Docker esté instalado
sudo docker --version

# Si funciona con sudo pero no sin sudo, reinicia la sesión
exit
ssh -i tu-key.pem ubuntu@tu-ip-ec2
```

### Error: "permission denied while trying to connect to the Docker daemon socket"

**Solución:**

```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión
exit
ssh -i tu-key.pem ubuntu@tu-ip-ec2

# Verificar
docker ps
```

### Error: "docker-compose: command not found"

**Solución:**

```bash
# Instalar Docker Compose standalone
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# O usar el plugin
docker compose version
```

### Error: "Cannot connect to the Docker daemon"

**Solución:**

```bash
# Iniciar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verificar estado
sudo systemctl status docker
```

## 📝 Notas Importantes

- **Usuario:** En Ubuntu EC2, el usuario por defecto es `ubuntu`, no `ec2-user`
- **Docker Compose:** Ubuntu puede tener el plugin (`docker compose`) o standalone (`docker-compose`)
- **Permisos:** Después de agregar usuario al grupo docker, siempre reinicia la sesión SSH

## 🔄 Actualizar GitHub Actions

Si tu EC2 es Ubuntu, asegúrate de que el secret `EC2_USER` en GitHub sea:

```
EC2_USER=ubuntu
```

No `ec2-user`.
