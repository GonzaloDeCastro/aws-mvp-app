import { QuoteModel } from "../models/quote.model.js";
import { HttpError } from "../utils/httpError.js";

export const QuoteController = {
  async getById(req, res, next) {
    try {
      const companyId = Number(req.headers["x-company-id"]);
      if (!companyId) throw new HttpError(400, "Missing x-company-id header");

      const quoteId = Number(req.params.id);
      if (!quoteId) throw new HttpError(400, "Invalid quote id");

      const data = await QuoteModel.getById({ companyId, quoteId });
      if (!data) throw new HttpError(404, "Quote not found");

      res.json({ ok: true, data });
    } catch (e) {
      next(e);
    }
  },
};
