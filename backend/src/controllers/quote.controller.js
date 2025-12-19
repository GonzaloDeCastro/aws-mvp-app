import { QuoteModel } from "../models/quote.model.js";
import { HttpError } from "../utils/httpError.js";

export const QuoteController = {
  async list(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const rows = await QuoteModel.listByCompany(companyId);
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const quoteId = Number(req.params.id);
      if (!quoteId) throw new HttpError(400, "Invalid quote id");

      const data = await QuoteModel.getById({ companyId, quoteId });
      if (!data) throw new HttpError(404, "Quote not found");

      res.json({ ok: true, data });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      const createdByUserId = Number(req.user?.id ?? req.user?.userId);
      if (!companyId || !createdByUserId)
        throw new HttpError(401, "Unauthorized");

      const {
        customerId = null,
        currency = "ARS",
        validUntil = null,
        items,
      } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        throw new HttpError(400, "items must be a non-empty array");
      }

      for (const it of items) {
        if (!it.productId)
          throw new HttpError(400, "Each item must include productId");
        if (Number(it.quantity ?? 0) <= 0)
          throw new HttpError(400, "quantity must be > 0");
        if (Number(it.unitPrice ?? -1) < 0)
          throw new HttpError(400, "unitPrice must be >= 0");
        if (Number(it.discountPct ?? 0) < 0)
          throw new HttpError(400, "discountPct must be >= 0");
      }

      const id = await QuoteModel.createWithItems({
        companyId,
        createdByUserId,
        customerId: customerId ? Number(customerId) : null,
        currency,
        validUntil,
        items,
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

      const quoteId = Number(req.params.id);
      if (!quoteId) throw new HttpError(400, "Invalid quote id");

      const {
        customerId = null,
        currency = "ARS",
        validUntil = null,
        items,
      } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        throw new HttpError(400, "items must be a non-empty array");
      }

      for (const it of items) {
        if (!it.productId)
          throw new HttpError(400, "Each item must include productId");
        if (Number(it.quantity ?? 0) <= 0)
          throw new HttpError(400, "quantity must be > 0");
        if (Number(it.unitPrice ?? -1) < 0)
          throw new HttpError(400, "unitPrice must be >= 0");
        if (Number(it.discountPct ?? 0) < 0)
          throw new HttpError(400, "discountPct must be >= 0");
      }

      await QuoteModel.updateWithItems({
        companyId,
        quoteId,
        customerId: customerId ? Number(customerId) : null,
        currency,
        validUntil,
        items,
      });

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const quoteId = Number(req.params.id);
      if (!quoteId) throw new HttpError(400, "Invalid quote id");

      const affected = await QuoteModel.remove({ companyId, quoteId });
      if (!affected) throw new HttpError(404, "Quote not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
};
