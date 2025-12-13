import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserModel } from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";

export const authService = {
  async register({ companyId, firstName, lastName, email, password }) {
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

    return { userId };
  },

  async login({ email, password }) {
    const user = await UserModel.findByEmailGlobal(email); // nuevo método
    if (!user || !user.is_active)
      throw new HttpError(401, "Invalid credentials");

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new HttpError(401, "Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id, email: user.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        companyId: user.company_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    };
  },
};
