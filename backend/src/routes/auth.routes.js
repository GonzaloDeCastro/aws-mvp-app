import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

export default router;
