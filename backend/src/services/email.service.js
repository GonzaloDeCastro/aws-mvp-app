import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// Crear transporter de nodemailer
const createTransporter = () => {
  console.log(env.email);
  if (!env.email.user || !env.email.password) {
    throw new Error(
      "Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD environment variables."
    );
  }

  return nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.secure, // true para 465, false para otros puertos
    auth: {
      user: env.email.user,
      pass: env.email.password,
    },
  });
};

export const emailService = {
  /**
   * Envía un email de verificación
   */
  async sendVerificationEmail({ to, firstName, token, baseUrl }) {
    const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

    const transporter = createTransporter();

    const mailOptions = {
      from: env.email.from,
      to,
      subject: "Verifica tu correo electrónico",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>¡Bienvenido, ${firstName}!</h2>
            <p>Gracias por registrarte. Por favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente botón:</p>
            <a href="${verificationUrl}" class="button">Verificar correo electrónico</a>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p><a href="${verificationUrl}">${verificationUrl}</a></p>
            <p>Este enlace expirará en 24 horas.</p>
            <div class="footer">
              <p>Si no creaste una cuenta, puedes ignorar este correo.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hola ${firstName},\n\nPor favor verifica tu correo electrónico visitando: ${verificationUrl}\n\nEste enlace expirará en 24 horas.`,
    };

    await transporter.sendMail(mailOptions);
  },

  /**
   * Envía un email de recuperación de contraseña
   */
  async sendPasswordResetEmail({ to, firstName, token, baseUrl }) {
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    const transporter = createTransporter();

    const mailOptions = {
      from: env.email.from,
      to,
      subject: "Recuperar contraseña",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
            .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Recuperar contraseña</h2>
            <p>Hola ${firstName},</p>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si fuiste tú, haz clic en el siguiente botón:</p>
            <a href="${resetUrl}" class="button">Restablecer contraseña</a>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <div class="warning">
              <p><strong>Importante:</strong> Este enlace expirará en 1 hora por razones de seguridad.</p>
            </div>
            <p>Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
            <div class="footer">
              <p>Por seguridad, nunca compartas este enlace con nadie.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hola ${firstName},\n\nPara restablecer tu contraseña, visita: ${resetUrl}\n\nEste enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.`,
    };

    await transporter.sendMail(mailOptions);
  },
};
