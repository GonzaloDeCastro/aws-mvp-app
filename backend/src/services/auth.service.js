import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserModel } from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";
import { emailService } from "./email.service.js";

export const authService = {
  async register({ companyId, firstName, lastName, email, password }) {
    const existing = await UserModel.findByEmail(Number(companyId), email);
    if (existing)
      throw new HttpError(409, "Email already in use for this company");

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = await UserModel.create({
      companyId: Number(companyId),
      firstName,
      lastName,
      email,
      passwordHash,
    });

    // Enviar email de verificación
    await this.sendVerificationEmail(userId);

    return { userId };
  },

  async login({ email, password }) {
    const user = await UserModel.findByEmailGlobal(email);
    if (!user || !user.is_active)
      throw new HttpError(401, "Invalid credentials");

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new HttpError(401, "Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id, email: user.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        companyId: user.company_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        emailVerified: user.email_verified === 1,
      },
    };
  },

  async sendVerificationEmail(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new HttpError(404, "User not found");

    if (user.email_verified === 1) {
      throw new HttpError(400, "Email already verified");
    }

    // Eliminar tokens anteriores de verificación
    await UserModel.deleteTokensByUserAndType(userId, "email_verification");

    // Crear nuevo token (expira en 24 horas)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const token = await UserModel.createToken({
      userId,
      type: "email_verification",
      expiresAt,
    });

    // Enviar email
    await emailService.sendVerificationEmail({
      to: user.email,
      firstName: user.first_name,
      token,
      baseUrl: env.app.baseUrl,
    });
  },

  async verifyEmail(token) {
    const tokenData = await UserModel.findTokenByToken(
      token,
      "email_verification"
    );
    if (!tokenData) {
      throw new HttpError(400, "Invalid or expired verification token");
    }

    // Marcar email como verificado
    await UserModel.markEmailAsVerified(tokenData.user_id);

    // Marcar token como usado
    await UserModel.markTokenAsUsed(tokenData.id);

    return { success: true };
  },

  async requestPasswordReset(email) {
    const user = await UserModel.findByEmailGlobal(email);
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return { success: true };
    }

    // Eliminar tokens anteriores de reset
    await UserModel.deleteTokensByUserAndType(user.id, "password_reset");

    // Crear nuevo token (expira en 1 hora)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const token = await UserModel.createToken({
      userId: user.id,
      type: "password_reset",
      expiresAt,
    });

    // Enviar email
    await emailService.sendPasswordResetEmail({
      to: user.email,
      firstName: user.first_name,
      token,
      baseUrl: env.app.baseUrl,
    });

    return { success: true };
  },

  async resetPassword(token, newPassword) {
    const tokenData = await UserModel.findTokenByToken(token, "password_reset");
    if (!tokenData) {
      throw new HttpError(400, "Invalid or expired reset token");
    }

    // Validar contraseña
    if (!newPassword || newPassword.length < 8) {
      throw new HttpError(400, "Password must be at least 8 characters");
    }

    // Hashear nueva contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await UserModel.updatePassword(tokenData.user_id, passwordHash);

    // Marcar token como usado
    await UserModel.markTokenAsUsed(tokenData.id);

    return { success: true };
  },
};
