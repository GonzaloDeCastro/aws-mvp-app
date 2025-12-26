import { SupplierModel } from "../models/supplier.model.js";
import { HttpError } from "../utils/httpError.js";

export const SupplierController = {
  async list(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const rows = await SupplierModel.listByCompany(companyId);
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const supplierId = Number(req.params.id);
      if (!supplierId) throw new HttpError(400, "Invalid supplier id");

      const row = await SupplierModel.getById({ companyId, supplierId });
      if (!row) throw new HttpError(404, "Supplier not found");

      res.json({ ok: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const {
        fantasyName,
        legalName = null,
        email = null,
        phone = null,
        taxId = null,
        address = null,
      } = req.body;

      if (!fantasyName) throw new HttpError(400, "fantasyName is required");

      const id = await SupplierModel.create({
        companyId,
        fantasyName,
        legalName,
        email,
        phone,
        taxId,
        address,
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

      const supplierId = Number(req.params.id);
      if (!supplierId) throw new HttpError(400, "Invalid supplier id");

      const {
        fantasyName,
        legalName = null,
        email = null,
        phone = null,
        taxId = null,
        address = null,
      } = req.body;

      if (!fantasyName) throw new HttpError(400, "fantasyName is required");

      const affected = await SupplierModel.update({
        companyId,
        supplierId,
        fantasyName,
        legalName,
        email,
        phone,
        taxId,
        address,
      });

      if (!affected) throw new HttpError(404, "Supplier not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const supplierId = Number(req.params.id);
      if (!supplierId) throw new HttpError(400, "Invalid supplier id");

      const affected = await SupplierModel.remove({ companyId, supplierId });
      if (!affected) throw new HttpError(404, "Supplier not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
};

