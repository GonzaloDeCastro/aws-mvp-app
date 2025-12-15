import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import companyRoutes from "./routes/company.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRoutes);
  app.use("/api/products", authMiddleware, productRoutes);
  app.use("/api/quotes", authMiddleware, quoteRoutes);
  app.use("/api/customers", authMiddleware, customerRoutes);
  app.use("/api/company", authMiddleware, companyRoutes);

  app.use(errorMiddleware);

  return app;
};
