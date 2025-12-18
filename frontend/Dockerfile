# Frontend Dockerfile (Multi-stage build)
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar código fuente
COPY . .

# Argumento de build para la URL de la API
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Construir aplicación
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Instalar serve y wget para healthcheck
RUN npm install -g serve && \
    apk add --no-cache wget

# Copiar archivos construidos desde el stage de build
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173 || exit 1

# Servir aplicación
CMD ["serve", "-s", "dist", "-l", "5173"]
