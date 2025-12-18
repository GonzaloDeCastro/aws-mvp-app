import { TaxModel } from "../models/tax.model.js";
import { HttpError } from "../utils/httpError.js";

export const TaxController = {
  async list(req, res, next) {
    try {
      const rows = await TaxModel.list();
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const taxId = Number(req.params.id);
      if (!taxId) throw new HttpError(400, "Invalid tax id");

      const row = await TaxModel.getById(taxId);
      if (!row) throw new HttpError(404, "Tax not found");

      res.json({ ok: true, data: row });
    } catch (e) {
      next(e);
    }
  },
};
