import { Router } from "express";
import { QuoteController } from "../controllers/quote.controller.js";

const router = Router();

router.get("/", QuoteController.list);
router.get("/:id", QuoteController.getById);
router.post("/", QuoteController.create);

export default router;
