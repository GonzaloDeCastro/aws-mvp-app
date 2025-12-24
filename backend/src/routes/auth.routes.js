import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schemas/auth.schemas.js";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.get(
  "/verify-email",
  validate(verifyEmailSchema),
  AuthController.verifyEmail
);
router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  AuthController.resendVerification
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  AuthController.resetPassword
);

export default router;
