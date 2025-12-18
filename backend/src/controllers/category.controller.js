import { CategoryModel } from "../models/category.model.js";
import { HttpError } from "../utils/httpError.js";

export const CategoryController = {
  async list(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const rows = await CategoryModel.listByCompany(companyId);
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const { name } = req.body;

      if (!name || !name.trim()) {
        throw new HttpError(400, "name is required");
      }

      const id = await CategoryModel.create({
        companyId,
        name: name.trim(),
      });

      res.status(201).json({ ok: true, data: { id } });
    } catch (e) {
      next(e);
    }
  },
};
