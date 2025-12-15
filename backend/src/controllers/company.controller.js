import { CompanyModel } from "../models/company.model.js";
import { HttpError } from "../utils/httpError.js";

export const CompanyController = {
  async me(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const row = await CompanyModel.getById(companyId);
      if (!row) throw new HttpError(404, "Company not found");

      const { logo, ...rest } = row;
      const logoBase64 =
        logo && Buffer.isBuffer(logo) ? logo.toString("base64") : null;

      res.json({ ok: true, data: { ...rest, logo: logoBase64 } });
    } catch (e) {
      next(e);
    }
  },

  async uploadLogo(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const { logo } = req.body;
      if (!logo || typeof logo !== "string") {
        throw new HttpError(400, "logo (base64) is required");
      }

      const logoBuffer = Buffer.from(logo, "base64");
      await CompanyModel.updateLogo({ companyId, logoBuffer });

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },
};
