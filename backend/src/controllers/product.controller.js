import { ProductModel } from "../models/product.model.js";

const badRequest = (message, details = null) => {
  const err = new Error(message);
  err.statusCode = 400;
  err.details = details;
  return err;
};

export const ProductController = {
  async list(req, res, next) {
    try {
      const companyId = Number(req.headers["x-company-id"]);
      if (!companyId) throw badRequest("Missing x-company-id header");

      const rows = await ProductModel.listByCompany(companyId);
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const companyId = Number(req.headers["x-company-id"]);
      if (!companyId) throw badRequest("Missing x-company-id header");

      const productId = Number(req.params.id);
      if (!productId) throw badRequest("Invalid product id");

      const row = await ProductModel.getById({ companyId, productId });
      if (!row) {
        const err = new Error("Product not found");
        err.statusCode = 404;
        throw err;
      }

      res.json({ ok: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const companyId = Number(req.headers["x-company-id"]);
      if (!companyId) throw badRequest("Missing x-company-id header");

      const {
        sku = null,
        name,
        brand = null,
        description = null,
        stockQty = 0,
        price = 0,
        currency = "USD",
      } = req.body;

      if (!name) throw badRequest("name is required");
      if (Number(price) < 0) throw badRequest("price must be >= 0");
      if (Number(stockQty) < 0) throw badRequest("stockQty must be >= 0");

      const id = await ProductModel.create({
        companyId,
        sku,
        name,
        brand,
        description,
        stockQty: Number(stockQty),
        price: Number(price),
        currency,
      });

      res.status(201).json({ ok: true, data: { id } });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const companyId = Number(req.headers["x-company-id"]);
      if (!companyId) throw badRequest("Missing x-company-id header");

      const productId = Number(req.params.id);
      if (!productId) throw badRequest("Invalid product id");

      const {
        sku = null,
        name,
        brand = null,
        description = null,
        stockQty = 0,
        price = 0,
        currency = "USD",
        isActive = 1,
      } = req.body;

      if (!name) throw badRequest("name is required");
      if (Number(price) < 0) throw badRequest("price must be >= 0");
      if (Number(stockQty) < 0) throw badRequest("stockQty must be >= 0");

      const affected = await ProductModel.update({
        companyId,
        productId,
        sku,
        name,
        brand,
        description,
        stockQty: Number(stockQty),
        price: Number(price),
        currency,
        isActive: Number(isActive) ? 1 : 0,
      });

      if (!affected) {
        const err = new Error("Product not found");
        err.statusCode = 404;
        throw err;
      }

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const companyId = Number(req.headers["x-company-id"]);
      if (!companyId) throw badRequest("Missing x-company-id header");

      const productId = Number(req.params.id);
      if (!productId) throw badRequest("Invalid product id");

      const affected = await ProductModel.remove({ companyId, productId });
      if (!affected) {
        const err = new Error("Product not found");
        err.statusCode = 404;
        throw err;
      }

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
};
