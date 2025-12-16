import mysql from "mysql2/promise";
import { env } from "./env.js";

const poolConfig = {
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
};

// Enable SSL if DB_SSL is set to 'true' or '1'
// Many cloud MySQL providers require SSL connections
if (process.env.DB_SSL === "true" || process.env.DB_SSL === "1") {
  poolConfig.ssl = {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
  };
}

export const pool = mysql.createPool(poolConfig);
