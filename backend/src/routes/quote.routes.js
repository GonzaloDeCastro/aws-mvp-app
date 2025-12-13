import { Router } from "express";
import { QuoteController } from "../controllers/quote.controller.js";

const router = Router();

router.get("/:id", QuoteController.getById);

export default router;
