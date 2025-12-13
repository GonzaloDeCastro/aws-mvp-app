import { asyncHandler } from "../utils/asyncHandler.js";
import { authService } from "../services/auth.service.js";

export const AuthController = {
  register: asyncHandler(async (req, res) => {
    const { companyId, firstName, lastName, email, password } =
      req.validated.body;

    const data = await authService.register({
      companyId,
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ ok: true, data });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.validated.body;
    const data = await authService.login({ email, password });
    res.json({ ok: true, data });
  }),
};
