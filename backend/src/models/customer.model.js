import { pool } from "../config/db.js";

export const CustomerModel = {
  async listByCompany(companyId) {
    const [rows] = await pool.execute(
      `
      SELECT id, company_id, name, email, phone, tax_id, address, created_at
      FROM customers
      WHERE company_id = ?
      ORDER BY id DESC
      `,
      [companyId]
    );
    return rows;
  },

  async getById({ companyId, customerId }) {
    const [rows] = await pool.execute(
      `
      SELECT id, company_id, name, email, phone, tax_id, address, created_at
      FROM customers
      WHERE company_id = ? AND id = ?
      LIMIT 1
      `,
      [companyId, customerId]
    );
    return rows[0] || null;
  },

  async create({ companyId, name, email, phone, taxId, address }) {
    const [result] = await pool.execute(
      `
      INSERT INTO customers (company_id, name, email, phone, tax_id, address)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [companyId, name, email, phone, taxId, address]
    );
    return result.insertId;
  },

  async update({ companyId, customerId, name, email, phone, taxId, address }) {
    const [result] = await pool.execute(
      `
      UPDATE customers
      SET name = ?, email = ?, phone = ?, tax_id = ?, address = ?
      WHERE company_id = ? AND id = ?
      `,
      [name, email, phone, taxId, address, companyId, customerId]
    );
    return result.affectedRows;
  },

  async remove({ companyId, customerId }) {
    const [result] = await pool.execute(
      `
      DELETE FROM customers
      WHERE company_id = ? AND id = ?
      `,
      [companyId, customerId]
    );
    return result.affectedRows;
  },
};
