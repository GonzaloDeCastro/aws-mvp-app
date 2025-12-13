export const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode ?? 500;

  res.status(status).json({
    ok: false,
    message: err.message ?? "Internal Server Error",
    details: err.details ?? null,
  });
};
