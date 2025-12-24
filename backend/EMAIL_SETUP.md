# Configuración de Email

Este documento describe cómo configurar el servicio de email para verificación de correo electrónico y recuperación de contraseña.

## Variables de Entorno Requeridas

Agrega las siguientes variables a tu archivo `.env.local` o `.env`:

```env
# Configuración de Email (SMTP)
EMAIL_HOST=smtp.gmail.com          # Servidor SMTP (ej: smtp.gmail.com, smtp.sendgrid.net)
EMAIL_PORT=587                     # Puerto SMTP (587 para TLS, 465 para SSL)
EMAIL_SECURE=false                 # true para SSL (puerto 465), false para TLS (puerto 587)
EMAIL_USER=tu-email@gmail.com      # Usuario/email del remitente
EMAIL_PASSWORD=tu-app-password     # Contraseña o App Password
EMAIL_FROM=tu-email@gmail.com      # Email del remitente (opcional, usa EMAIL_USER por defecto)

# URL base de la aplicación (para los links en los emails)
APP_BASE_URL=http://localhost:5173 # URL del frontend
```

## Configuración por Proveedor

### Gmail

1. **Habilitar verificación en 2 pasos** en tu cuenta de Google
2. **Generar una App Password**:
   - Ve a https://myaccount.google.com/apppasswords
   - Genera una contraseña para "Mail"
   - Usa esta contraseña como `EMAIL_PASSWORD`

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App Password de 16 caracteres
EMAIL_FROM=tu-email@gmail.com
```

### SendGrid

1. Crea una cuenta en [SendGrid](https://sendgrid.com/)
2. Genera una API Key
3. Configura:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.xxxxxxxxxxxxx  # Tu API Key de SendGrid
EMAIL_FROM=noreply@tudominio.com
```

### Outlook/Office 365

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@outlook.com
EMAIL_PASSWORD=tu-contraseña
EMAIL_FROM=tu-email@outlook.com
```

### Otras opciones

- **Mailgun**: `smtp.mailgun.org` (puerto 587)
- **AWS SES**: Configura según la región
- **Mailtrap** (solo desarrollo): `smtp.mailtrap.io` (puerto 2525)

## Migración de Base de Datos

Ejecuta el archivo SQL de migración para agregar las tablas necesarias:

```bash
mysql -u usuario -p nombre_base_datos < backend/add_email_verification_and_password_reset.sql
```

O ejecuta el contenido del archivo SQL en tu cliente MySQL:

```sql
-- Agregar columna email_verified a la tabla users
ALTER TABLE users
ADD COLUMN email_verified TINYINT(1) NOT NULL DEFAULT 0 AFTER email;

-- Crear tabla para tokens
CREATE TABLE IF NOT EXISTS user_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  type ENUM('email_verification', 'password_reset') NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_user_type (user_id, type),
  INDEX idx_expires_at (expires_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Endpoints Disponibles

### Verificación de Email

- `GET /api/auth/verify-email?token=<token>` - Verificar email con token
- `POST /api/auth/resend-verification` - Reenviar email de verificación
  ```json
  {
    "email": "usuario@example.com"
  }
  ```

### Recuperación de Contraseña

- `POST /api/auth/forgot-password` - Solicitar reset de contraseña

  ```json
  {
    "email": "usuario@example.com"
  }
  ```

- `POST /api/auth/reset-password` - Resetear contraseña con token
  ```json
  {
    "token": "token-del-email",
    "password": "nueva-contraseña-min-8-caracteres"
  }
  ```

## Testing

Para probar en desarrollo sin enviar emails reales, puedes usar:

1. **Mailtrap** (recomendado para desarrollo)

   - Crea una cuenta gratuita en https://mailtrap.io
   - Obtén las credenciales SMTP
   - Configura en tu `.env.local`

2. **Nodemailer Test Account**
   - Usa `ethereal.email` para generar credenciales de prueba
   - Los emails se capturan pero no se envían realmente

## Notas Importantes

- Los tokens de verificación expiran en **24 horas**
- Los tokens de reset de contraseña expiran en **1 hora**
- Los tokens se marcan como usados después de ser utilizados
- Por seguridad, no se revela si un email existe o no en las respuestas

## Verificación de Email Requerida

Por defecto, el sistema **permite login sin verificar el email**, pero muestra un banner de advertencia en la aplicación.

### Opción 1: Banner de Advertencia (Por defecto)

Si el usuario no ha verificado su email, verá un banner amarillo en la parte superior de la aplicación con:

- Mensaje de advertencia
- Botón para reenviar el email de verificación
- Opción para cerrar el banner

### Opción 2: Requerir Verificación Antes de Login

Si quieres que los usuarios **deban verificar su email antes de poder iniciar sesión**, agrega esta variable a tu `.env.local`:

```env
REQUIRE_EMAIL_VERIFICATION=true
```

Con esta opción activada:

- Los usuarios no podrán iniciar sesión hasta verificar su email
- Recibirán un error claro: "Por favor verifica tu correo electrónico antes de iniciar sesión"
- Deberán hacer clic en el enlace del email de verificación primero

**Recomendación**: Para desarrollo, deja esta opción en `false` (o sin configurar). Para producción, considera activarla según tus necesidades de seguridad.

## Flujo de Usuario en el Frontend

### Verificación de Email

1. Al registrarse, el usuario recibe automáticamente un email de verificación
2. El usuario hace clic en el enlace del email
3. Es redirigido a `/verify-email?token=...`
4. El sistema verifica el token y muestra mensaje de éxito
5. El usuario puede iniciar sesión normalmente

### Recuperación de Contraseña

1. El usuario va a `/login` y hace clic en "¿Olvidaste tu contraseña?"
2. Es redirigido a `/forgot-password`
3. Ingresa su email y hace clic en "Enviar enlace de recuperación"
4. Recibe un email con un enlace de recuperación
5. Hace clic en el enlace y es redirigido a `/reset-password?token=...`
6. Ingresa su nueva contraseña (mínimo 8 caracteres)
7. Confirma la contraseña y hace clic en "Restablecer contraseña"
8. Es redirigido automáticamente al login

## Pruebas Rápidas

### 1. Verificación de Email

```bash
# 1. Registra un nuevo usuario
POST /api/company/register
{
  "name": "Mi Empresa",
  "firstName": "Juan",
  "lastName": "Pérez",
  "userEmail": "juan@test.com",
  "password": "password123"
}

# 2. Verifica el email del usuario (el token viene en el email)
GET /api/auth/verify-email?token=<token-del-email>

# 3. O reenvía el email de verificación
POST /api/auth/resend-verification
{
  "email": "juan@test.com"
}
```

### 2. Reset de Contraseña

```bash
# 1. Solicita reset de contraseña
POST /api/auth/forgot-password
{
  "email": "juan@test.com"
}

# 2. Usa el token del email para resetear
POST /api/auth/reset-password
{
  "token": "<token-del-email>",
  "password": "nueva-password-123"
}
```

## Variables de Entorno Requeridas

Asegúrate de tener estas variables configuradas en tu `.env.local`:

```env
# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password
EMAIL_FROM=tu-email@gmail.com

# URL base del frontend (para los links en los emails)
APP_BASE_URL=http://localhost:5173
```

**Nota:** En producción, cambia `APP_BASE_URL` a la URL real de tu frontend (ej: `https://tu-dominio.com`).
