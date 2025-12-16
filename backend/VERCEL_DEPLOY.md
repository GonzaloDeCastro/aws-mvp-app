# Guía de Despliegue en Vercel

## Variables de Entorno Requeridas

Para que el backend funcione correctamente en Vercel, debes configurar las siguientes variables de entorno en el dashboard de Vercel:

### Base de Datos MySQL

- `DB_HOST` - Host de tu base de datos MySQL en la nube
- `DB_PORT` - Puerto de la base de datos (generalmente 3306)
- `DB_USER` - Usuario de la base de datos
- `DB_PASSWORD` - Contraseña de la base de datos
- `DB_NAME` - Nombre de la base de datos
- `DB_SSL` - (Opcional) Establecer a "true" o "1" si tu proveedor requiere SSL (recomendado para producción)
- `DB_SSL_REJECT_UNAUTHORIZED` - (Opcional) Establecer a "false" si tu certificado SSL no es verificado (por defecto: "true")

### JWT (JSON Web Tokens)

- `JWT_SECRET` - Secreto para firmar los tokens JWT (usa un string largo y aleatorio)
- `JWT_EXPIRES_IN` - Tiempo de expiración del token (opcional, por defecto: "1d")

### Otros

- `NODE_ENV` - Se establece automáticamente como "production" en Vercel
- `PORT` - Se establece automáticamente por Vercel (no necesitas configurarlo)

## Cómo Configurar las Variables en Vercel

1. Ve a tu proyecto en el dashboard de Vercel
2. Navega a **Settings** → **Environment Variables**
3. Agrega cada una de las variables listadas arriba
4. Asegúrate de que estén configuradas para el entorno de **Production** (y opcionalmente Preview/Development)
5. Guarda los cambios

## Estructura del Proyecto

El backend está configurado para funcionar como una función serverless en Vercel:

- `api/index.js` - Punto de entrada serverless que exporta la app Express
- `vercel.json` - Configuración de Vercel para enrutar todas las peticiones al handler
- `src/` - Código fuente de la aplicación

## Notas Importantes

- El backend NO necesita escuchar en un puerto específico en Vercel (Vercel maneja esto automáticamente)
- Todas las rutas de la API estarán disponibles en: `https://tu-proyecto.vercel.app/api/*`
- El endpoint de health check estará en: `https://tu-proyecto.vercel.app/health`

## Troubleshooting

Si el despliegue falla:

1. **Verifica que todas las variables de entorno estén configuradas** - El error más común es que falte alguna variable requerida
2. **Revisa los logs de build en Vercel** - Ve a tu deployment y haz clic en "View Function Logs"
3. **Verifica la conexión a la base de datos** - Asegúrate de que tu base de datos MySQL permita conexiones desde las IPs de Vercel (puede que necesites configurar el firewall)
4. **Verifica que el puerto de la base de datos sea accesible** - Algunos proveedores de MySQL requieren SSL o configuraciones especiales
