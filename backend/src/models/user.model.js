import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserModel } from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";

export const AuthController = {
  async register(req, res, next) {
    try {
      const { companyId, firstName, lastName, email, password } = req.body;

      if (!companyId) throw new HttpError(400, "companyId is required");
      if (!email) throw new HttpError(400, "email is required");
      if (!password || password.length < 8)
        throw new HttpError(400, "password must be at least 8 chars");

      const existing = await UserModel.findByEmail(Number(companyId), email);
      if (existing)
        throw new HttpError(409, "Email already in use for this company");

      const passwordHash = await bcrypt.hash(password, 10);
      const userId = await UserModel.create({
        companyId: Number(companyId),
        firstName,
        lastName,
        email,
        passwordHash,
      });

      res.status(201).json({ ok: true, data: { userId } });
    } catch (e) {
      next(e);
    }
  },

  async login(req, res, next) {
    try {
      const { companyId, email, password } = req.body;

      if (!companyId) throw new HttpError(400, "companyId is required");
      if (!email) throw new HttpError(400, "email is required");
      if (!password) throw new HttpError(400, "password is required");

      const user = await UserModel.findByEmail(Number(companyId), email);
      if (!user || !user.is_active)
        throw new HttpError(401, "Invalid credentials");

      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) throw new HttpError(401, "Invalid credentials");

      const token = jwt.sign(
        { userId: user.id, companyId: user.company_id, email: user.email },
        env.jwt.secret,
        { expiresIn: env.jwt.expiresIn }
      );

      res.json({
        ok: true,
        data: {
          token,
          user: {
            id: user.id,
            companyId: user.company_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  },
};
