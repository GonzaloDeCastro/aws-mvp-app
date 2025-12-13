import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";

const router = Router();

router.get("/", CustomerController.list);
router.get("/:id", CustomerController.getById);
router.post("/", CustomerController.create);
router.put("/:id", CustomerController.update);
router.delete("/:id", CustomerController.remove);

export default router;
