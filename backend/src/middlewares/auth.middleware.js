import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      throw new HttpError(401, "Missing auth token");
    }

    const payload = jwt.verify(token, env.jwt.secret);

    req.user = {
      id: payload.userId,
      companyId: payload.companyId,
      email: payload.email,
    };

    next();
  } catch (e) {
    // Si jwt.verify falla, lo convertimos en 401 consistente
    const isHttpError = e?.statusCode;
    next(isHttpError ? e : new HttpError(401, "Invalid or expired token"));
  }
};
