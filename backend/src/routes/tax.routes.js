import { Router } from "express";
import { TaxController } from "../controllers/tax.controller.js";

const router = Router();

router.get("/", TaxController.list);
router.get("/:id", TaxController.getById);

export default router;
