import { pool } from "../config/db.js";

export const CompanyModel = {
  async getById(companyId) {
    const [rows] = await pool.execute(
      `
      SELECT id, name, email, phone, address, logo
      FROM companies
      WHERE id = ?
      LIMIT 1
      `,
      [companyId]
    );

    return rows[0] || null;
  },

  async updateLogo({ companyId, logoBuffer }) {
    const [result] = await pool.execute(
      `UPDATE companies SET logo = ? WHERE id = ?`,
      [logoBuffer, companyId]
    );
    return result.affectedRows;
  },
};
