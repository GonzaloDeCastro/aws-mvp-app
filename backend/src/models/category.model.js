import { pool } from "../config/db.js";

export const CategoryModel = {
  async listByCompany(companyId) {
    const [rows] = await pool.execute(
      `SELECT id, company_id, name, is_active, created_at
       FROM categories
       WHERE company_id = ? AND is_active = 1
       ORDER BY name ASC`,
      [companyId]
    );
    return rows;
  },

  async getById({ companyId, categoryId }) {
    const [rows] = await pool.execute(
      `SELECT id, company_id, name, is_active, created_at
       FROM categories
       WHERE company_id = ? AND id = ?
       LIMIT 1`,
      [companyId, categoryId]
    );
    return rows[0] ?? null;
  },

  async create({ companyId, name }) {
    // Verificar si ya existe
    const [existing] = await pool.execute(
      `SELECT id FROM categories WHERE company_id = ? AND name = ?`,
      [companyId, name]
    );

    if (existing.length > 0) {
      return existing[0].id;
    }

    const [result] = await pool.execute(
      `INSERT INTO categories (company_id, name)
       VALUES (?, ?)`,
      [companyId, name]
    );
    return result.insertId;
  },
};
