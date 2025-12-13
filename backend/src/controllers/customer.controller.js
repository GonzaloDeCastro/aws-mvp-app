import { CustomerModel } from "../models/customer.model.js";
import { HttpError } from "../utils/httpError.js";

export const CustomerController = {
  async list(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const rows = await CustomerModel.listByCompany(companyId);
      res.json({ ok: true, data: rows });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const customerId = Number(req.params.id);
      if (!customerId) throw new HttpError(400, "Invalid customer id");

      const row = await CustomerModel.getById({ companyId, customerId });
      if (!row) throw new HttpError(404, "Customer not found");

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
        name,
        email = null,
        phone = null,
        taxId = null,
        address = null,
      } = req.body;

      if (!name) throw new HttpError(400, "name is required");

      const id = await CustomerModel.create({
        companyId,
        name,
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

      const customerId = Number(req.params.id);
      if (!customerId) throw new HttpError(400, "Invalid customer id");

      const {
        name,
        email = null,
        phone = null,
        taxId = null,
        address = null,
      } = req.body;

      if (!name) throw new HttpError(400, "name is required");

      const affected = await CustomerModel.update({
        companyId,
        customerId,
        name,
        email,
        phone,
        taxId,
        address,
      });

      if (!affected) throw new HttpError(404, "Customer not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const customerId = Number(req.params.id);
      if (!customerId) throw new HttpError(400, "Invalid customer id");

      const affected = await CustomerModel.remove({ companyId, customerId });
      if (!affected) throw new HttpError(404, "Customer not found");

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
};
