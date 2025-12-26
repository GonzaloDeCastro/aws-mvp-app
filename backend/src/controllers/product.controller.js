import { ProductModel } from "../models/product.model.js";
import { HttpError } from "../utils/httpError.js";

export const ProductController = {
  async list(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const rows = await ProductModel.listByCompany(companyId);
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const productId = Number(req.params.id);
      if (!productId) throw new HttpError(400, "Invalid product id");

      const row = await ProductModel.getById({ companyId, productId });
      if (!row) throw new HttpError(404, "Product not found");

      // Obtener categorías y componentes
      const categories = await ProductModel.getCategories(productId);
      const components = await ProductModel.getComponents(productId);

      res.json({
        ok: true,
        data: {
          ...row,
          categories: categories.map((c) => c.id),
          components: components.map((c) => ({
            id: c.id,
            qty: Number(c.qty),
          })),
        },
      });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const {
        sku = null,
        name,
        brand = null,
        supplier = null,
        description = null,
        stockQty = 0,
        price = 0,
        currency = "ARS",
        taxId = null,
        categoryIds = [],
        components = [],
      } = req.body;

      if (!name) throw new HttpError(400, "name is required");
      if (Number(price) < 0) throw new HttpError(400, "price must be >= 0");
      if (Number(stockQty) < 0)
        throw new HttpError(400, "stockQty must be >= 0");

      // Validar componentes
      if (components && components.length > 0) {
        for (const comp of components) {
          if (!comp.id) throw new HttpError(400, "component.id is required");
          if (Number(comp.qty) <= 0)
            throw new HttpError(400, "component.qty must be > 0");
        }
      }

      const id = await ProductModel.create({
        companyId,
        sku,
        name,
        brand,
        supplier,
        description,
        stockQty: Number(stockQty),
        price: Number(price),
        currency,
        taxId: taxId ? Number(taxId) : null,
        categoryIds: Array.isArray(categoryIds) ? categoryIds : [],
        components: Array.isArray(components) ? components : [],
      });

      res.status(201).json({ ok: true, data: { id } });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const productId = Number(req.params.id);
      if (!productId) throw new HttpError(400, "Invalid product id");

      const {
        sku = null,
        name,
        brand = null,
        supplier = null,
        description = null,
        stockQty = 0,
        price = 0,
        currency = "ARS",
        taxId = null,
        isActive = 1,
        categoryIds,
        components,
      } = req.body;

      if (!name) throw new HttpError(400, "name is required");
      if (Number(price) < 0) throw new HttpError(400, "price must be >= 0");
      if (Number(stockQty) < 0)
        throw new HttpError(400, "stockQty must be >= 0");

      // Validar componentes si se proporcionan
      if (components !== undefined && components.length > 0) {
        for (const comp of components) {
          if (!comp.id) throw new HttpError(400, "component.id is required");
          if (Number(comp.qty) <= 0)
            throw new HttpError(400, "component.qty must be > 0");
        }
      }

      const affected = await ProductModel.update({
        companyId,
        productId,
        sku,
        name,
        brand,
        supplier,
        description,
        stockQty: Number(stockQty),
        price: Number(price),
        currency,
        taxId: taxId !== undefined ? (taxId ? Number(taxId) : null) : undefined,
        isActive: Number(isActive) ? 1 : 0,
        categoryIds:
          categoryIds !== undefined
            ? Array.isArray(categoryIds)
              ? categoryIds
              : []
            : undefined,
        components:
          components !== undefined
            ? Array.isArray(components)
              ? components
              : []
            : undefined,
      });

      if (!affected) throw new HttpError(404, "Product not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const productId = Number(req.params.id);
      if (!productId) throw new HttpError(400, "Invalid product id");

      const affected = await ProductModel.remove({ companyId, productId });
      if (!affected) throw new HttpError(404, "Product not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
};
