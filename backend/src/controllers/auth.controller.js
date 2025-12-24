import { asyncHandler } from "../utils/asyncHandler.js";
import { authService } from "../services/auth.service.js";

export const AuthController = {
  register: asyncHandler(async (req, res) => {
    const { companyId, firstName, lastName, email, password } =
      req.validated.body;

    const data = await authService.register({
      companyId,
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ ok: true, data });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.validated.body;
    const data = await authService.login({ email, password });
    res.json({ ok: true, data });
  }),

  verifyEmail: asyncHandler(async (req, res) => {
    const { token } = req.validated.query;
    const data = await authService.verifyEmail(token);
    res.json({ ok: true, data });
  }),

  resendVerification: asyncHandler(async (req, res) => {
    const { email } = req.validated.body;
    // Buscar usuario por email
    const { UserModel } = await import("../models/user.model.js");
    const user = await UserModel.findByEmailGlobal(email);
    if (!user) {
      // Por seguridad, no revelamos si el email existe
      return res.json({
        ok: true,
        message: "If the email exists, a verification email has been sent",
      });
    }
    await authService.sendVerificationEmail(user.id);
    res.json({
      ok: true,
      message: "If the email exists, a verification email has been sent",
    });
  }),

  forgotPassword: asyncHandler(async (req, res) => {
    const { email } = req.validated.body;
    const data = await authService.requestPasswordReset(email);
    res.json({
      ok: true,
      data,
      message: "If the email exists, a password reset email has been sent",
    });
  }),

  resetPassword: asyncHandler(async (req, res) => {
    const { token, password } = req.validated.body;
    const data = await authService.resetPassword(token, password);
    res.json({
      ok: true,
      data,
      message: "Password has been reset successfully",
    });
  }),
};
