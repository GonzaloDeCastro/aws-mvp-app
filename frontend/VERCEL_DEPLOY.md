# Guía de Despliegue del Frontend en Vercel

## Variables de Entorno Requeridas

Para que el frontend se conecte correctamente con el backend en Vercel, debes configurar la siguiente variable de entorno:

### API Base URL

- `VITE_API_BASE_URL` - URL completa del backend API
  - **Local**: `http://localhost:3001/api`
  - **Producción**: `https://tu-backend.vercel.app/api` (reemplaza con la URL real de tu backend)

## Cómo Configurar en Vercel

1. Ve a tu proyecto del frontend en el dashboard de Vercel
2. Navega a **Settings** → **Environment Variables**
3. Agrega la variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://tu-backend.vercel.app/api` (la URL de tu backend desplegado)
   - **Environment**: Selecciona **Production** (y opcionalmente Preview/Development)
4. Guarda los cambios

## Configuración Local

Para desarrollo local, crea un archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

**Nota**: El archivo `.env` ya está en `.gitignore` y no se subirá al repositorio.

## Importante

- En Vite, las variables de entorno **deben tener el prefijo `VITE_`** para ser expuestas al cliente
- Después de agregar o modificar variables de entorno en Vercel, necesitas **redesplegar** el proyecto para que los cambios surtan efecto
- El frontend usa esta variable en `src/config.js` para conectarse al backend

## Verificación

Después del despliegue, verifica que el frontend se conecte correctamente:

1. Abre la consola del navegador (F12)
2. Revisa que no haya errores de CORS o conexión
3. Prueba hacer una petición a la API desde el frontend
