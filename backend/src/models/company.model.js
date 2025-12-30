import { pool } from "../config/db.js";

export const CompanyModel = {
  async getById(companyId) {
    const [rows] = await pool.execute(
      `
      SELECT id, name, legal_name, tax_id, email, phone, address, logo, dollar_rate
      FROM companies
      WHERE id = ?
      LIMIT 1
      `,
      [companyId]
    );

    return rows[0] || null;
  },

  async create({ name, legalName, taxId, email, phone, address, logoBuffer }) {
    const [result] = await pool.execute(
      `
      INSERT INTO companies (name, legal_name, tax_id, email, phone, address, logo, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `,
      [
        name,
        legalName || null,
        taxId || null,
        email || null,
        phone || null,
        address || null,
        logoBuffer || null,
      ]
    );
    return result.insertId;
  },

  async updateLogo({ companyId, logoBuffer }) {
    const [result] = await pool.execute(
      `UPDATE companies SET logo = ? WHERE id = ?`,
      [logoBuffer, companyId]
    );
    return result.affectedRows;
  },

  async updateDollarRate({ companyId, dollarRate }) {
    const [result] = await pool.execute(
      `UPDATE companies SET dollar_rate = ? WHERE id = ?`,
      [dollarRate, companyId]
    );
    return result.affectedRows;
  },

  async update({ companyId, name, legalName, taxId, email, phone, address }) {
    const [result] = await pool.execute(
      `
      UPDATE companies
      SET name = ?, legal_name = ?, tax_id = ?, email = ?, phone = ?, address = ?
      WHERE id = ?
      `,
      [name, legalName || null, taxId || null, email || null, phone || null, address || null, companyId]
    );
    return result.affectedRows;
  },
};
