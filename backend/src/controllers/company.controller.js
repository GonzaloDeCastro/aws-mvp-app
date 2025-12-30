import { CompanyModel } from "../models/company.model.js";
import { HttpError } from "../utils/httpError.js";
import { authService } from "../services/auth.service.js";
import bcrypt from "bcrypt";

export const CompanyController = {
  async register(req, res, next) {
    try {
      const {
        name,
        legalName,
        taxId,
        email,
        phone,
        address,
        logo,
        // User data
        firstName,
        lastName,
        userEmail,
        password,
      } = req.body;

      if (!name || !firstName || !lastName || !userEmail || !password) {
        throw new HttpError(400, "Missing required fields");
      }

      // Check if user email already exists globally
      const { UserModel } = await import("../models/user.model.js");
      const existingUser = await UserModel.findByEmailGlobal(userEmail);
      if (existingUser) {
        throw new HttpError(409, "Email already registered");
      }

      // Create company
      const logoBuffer =
        logo && typeof logo === "string" ? Buffer.from(logo, "base64") : null;
      const companyId = await CompanyModel.create({
        name,
        legalName,
        taxId,
        email,
        phone,
        address,
        logoBuffer,
      });

      // Create initial user for the company
      const passwordHash = await bcrypt.hash(password, 10);
      const userId = await UserModel.create({
        companyId,
        firstName,
        lastName,
        email: userEmail,
        passwordHash,
      });

      // Send verification email
      try {
        await authService.sendVerificationEmail(userId);
      } catch (emailError) {
        // Log error but don't fail registration if email fails
        console.error("Failed to send verification email:", emailError);
      }

      // Login the user automatically
      const loginData = await authService.login({ email: userEmail, password });

      res.status(201).json({
        ok: true,
        data: {
          companyId,
          userId,
          ...loginData,
        },
      });
    } catch (e) {
      next(e);
    }
  },

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

      // Validar tamaño del buffer (máximo 2MB después de decodificar)
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (logoBuffer.length > MAX_SIZE) {
        throw new HttpError(
          413,
          `El archivo es demasiado grande. Tamaño máximo: 2MB. Tamaño actual: ${(
            logoBuffer.length /
            1024 /
            1024
          ).toFixed(2)}MB`
        );
      }

      await CompanyModel.updateLogo({ companyId, logoBuffer });

      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  },

  async updateDollarRate(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const { dollarRate } = req.body;
      if (dollarRate === undefined || dollarRate === null) {
        throw new HttpError(400, "dollarRate is required");
      }

      const rate = Number(dollarRate);
      if (!Number.isFinite(rate) || rate <= 0) {
        throw new HttpError(400, "dollarRate must be a positive number");
      }

      await CompanyModel.updateDollarRate({ companyId, dollarRate: rate });

      // Retornar la compañía actualizada
      const company = await CompanyModel.getById(companyId);
      if (!company) throw new HttpError(404, "Company not found");

      const { logo, ...rest } = company;
      const logoBase64 =
        logo && Buffer.isBuffer(logo) ? logo.toString("base64") : null;

      res.json({ ok: true, data: { ...rest, logo: logoBase64 } });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const companyId = Number(req.user?.companyId);
      if (!companyId) throw new HttpError(401, "Unauthorized");

      const {
        name,
        legalName = null,
        taxId = null,
        email = null,
        phone = null,
        address = null,
      } = req.body;

      if (!name) {
        throw new HttpError(400, "name is required");
      }

      const affected = await CompanyModel.update({
        companyId,
        name,
        legalName,
        taxId,
        email,
        phone,
        address,
      });

      if (!affected) throw new HttpError(404, "Company not found");

      // Obtener la compañía actualizada
      const updatedCompany = await CompanyModel.getById(companyId);
      if (!updatedCompany) throw new HttpError(404, "Company not found");

      const { logo, ...rest } = updatedCompany;
      const logoBase64 =
        logo && Buffer.isBuffer(logo) ? logo.toString("base64") : null;

      res.json({ ok: true, data: { ...rest, logo: logoBase64 } });
    } catch (e) {
      next(e);
    }
  },
};
