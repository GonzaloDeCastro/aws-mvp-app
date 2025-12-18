import { pool } from "../config/db.js";

export const TaxModel = {
  async list() {
    const [rows] = await pool.execute(
      `SELECT id, name, rate, is_active, created_at
       FROM taxes
       WHERE is_active = 1
       ORDER BY rate ASC`
    );
    return rows;
  },

  async getById(taxId) {
    const [rows] = await pool.execute(
      `SELECT id, name, rate, is_active, created_at
       FROM taxes
       WHERE id = ? AND is_active = 1
       LIMIT 1`,
      [taxId]
    );
    return rows[0] ?? null;
  },
};
