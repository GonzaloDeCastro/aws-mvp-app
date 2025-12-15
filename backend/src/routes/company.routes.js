import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";

const router = Router();

router.get("/me", CompanyController.me);
router.post("/logo", CompanyController.uploadLogo);

export default router;
