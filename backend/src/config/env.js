import dotenv from "dotenv";
import { existsSync } from "fs";

// Load .env file in local development (not in Docker/containerized environments)
// Priority: .env.local > .env
// In production (Vercel, Docker), environment variables are injected automatically
// Check if we're in a containerized environment (Docker sets these)
const isContainerized =
  process.env.DOCKER_CONTAINER === "true" ||
  existsSync("/.dockerenv") ||
  process.env.NODE_ENV === "production";

if (!isContainerized && process.env.NODE_ENV !== "production") {
  // Try .env.local first, then fallback to .env
  if (existsSync(".env.local")) {
    dotenv.config({ path: ".env.local" });
  }
  // Only load .env if it exists (don't fail if it doesn't)
  if (existsSync(".env")) {
    dotenv.config(); // This will not override existing variables from .env.local
  }
}

const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3001),

  db: {
    host: required("DB_HOST"),
    port: Number(required("DB_PORT")),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
  },

  jwt: {
    secret: required("JWT_SECRET"),
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
  },

  email: {
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: process.env.EMAIL_SECURE === "true", // true para 465, false para 587 y otros
    user: process.env.EMAIL_USER ?? "",
    password: process.env.EMAIL_PASSWORD ?? "",
    from: process.env.EMAIL_FROM ?? process.env.EMAIL_USER ?? "",
  },

  app: {
    baseUrl: process.env.APP_BASE_URL ?? "http://localhost:5173",
    requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === "true", // Por defecto: false (permite login sin verificar)
  },
};
