import { HttpError } from "../utils/httpError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    throw new HttpError(400, "Validation error", result.error.flatten());
  }

  req.validated = result.data;
  next();
};
