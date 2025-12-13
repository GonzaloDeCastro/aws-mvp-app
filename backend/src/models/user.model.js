import { pool } from "../config/db.js";

export const UserModel = {
  async findByEmailGlobal(email) {
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0] || null;
  },

  async create({ companyId, firstName, lastName, email, passwordHash }) {
    const [result] = await pool.execute(
      `INSERT INTO users (company_id, first_name, last_name, email, password_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [companyId, firstName, lastName, email, passwordHash]
    );
    return result.insertId;
  },
};
