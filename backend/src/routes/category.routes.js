import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const router = Router();

router.get("/", CategoryController.list);
router.post("/", CategoryController.create);

export default router;
