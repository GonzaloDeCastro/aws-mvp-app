# Frontend Dockerfile (Multi-stage build)
# syntax=docker/dockerfile:1.4
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
# Usar cache mount para reducir espacio en disco (requiere BuildKit)
# Si BuildKit no está disponible, Docker ignorará --mount y usará método estándar
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund && \
    rm -rf /tmp/* /var/tmp/*

# Copiar código fuente
COPY . .

# Argumento de build para la URL de la API
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Construir aplicación
RUN npm run build && \
    rm -rf node_modules && \
    rm -rf /tmp/* /var/tmp/*

# Stage 2: Production
FROM nginx:alpine

# Copiar archivos construidos desde el stage de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Nginx corre en foreground por defecto en la imagen de alpine
CMD ["nginx", "-g", "daemon off;"]
