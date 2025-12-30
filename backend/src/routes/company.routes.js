import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route - no auth required
router.post("/register", CompanyController.register);

// Protected routes - require auth
router.get("/me", authMiddleware, CompanyController.me);
router.post("/logo", authMiddleware, CompanyController.uploadLogo);
router.put("/dollar-rate", authMiddleware, CompanyController.updateDollarRate);
router.put("/update", authMiddleware, CompanyController.update);

export default router;
