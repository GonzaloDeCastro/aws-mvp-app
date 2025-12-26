import { pool } from "../config/db.js";

export const SupplierModel = {
  async listByCompany(companyId) {
    const [rows] = await pool.execute(
      `
      SELECT id, company_id, fantasy_name, legal_name, email, phone, tax_id, address, created_at
      FROM suppliers
      WHERE company_id = ?
      ORDER BY id DESC
      `,
      [companyId]
    );
    return rows;
  },

  async getById({ companyId, supplierId }) {
    const [rows] = await pool.execute(
      `
      SELECT id, company_id, fantasy_name, legal_name, email, phone, tax_id, address, created_at
      FROM suppliers
      WHERE company_id = ? AND id = ?
      LIMIT 1
      `,
      [companyId, supplierId]
    );
    return rows[0] || null;
  },

  async create({ companyId, fantasyName, legalName, email, phone, taxId, address }) {
    const [result] = await pool.execute(
      `
      INSERT INTO suppliers (company_id, fantasy_name, legal_name, email, phone, tax_id, address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [companyId, fantasyName, legalName, email, phone, taxId, address]
    );
    return result.insertId;
  },

  async update({ companyId, supplierId, fantasyName, legalName, email, phone, taxId, address }) {
    const [result] = await pool.execute(
      `
      UPDATE suppliers
      SET fantasy_name = ?, legal_name = ?, email = ?, phone = ?, tax_id = ?, address = ?
      WHERE company_id = ? AND id = ?
      `,
      [fantasyName, legalName, email, phone, taxId, address, companyId, supplierId]
    );
    return result.affectedRows;
  },

  async remove({ companyId, supplierId }) {
    const [result] = await pool.execute(
      `
      DELETE FROM suppliers
      WHERE company_id = ? AND id = ?
      `,
      [companyId, supplierId]
    );
    return result.affectedRows;
  },
};

