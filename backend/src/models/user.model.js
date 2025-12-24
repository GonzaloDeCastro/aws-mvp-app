import { pool } from "../config/db.js";
import crypto from "crypto";

export const UserModel = {
  async findById(userId) {
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );
    return rows[0] || null;
  },

  async findByEmailGlobal(email) {
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0] || null;
  },

  async findByEmail(companyId, email) {
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE company_id = ? AND email = ? LIMIT 1`,
      [companyId, email]
    );
    return rows[0] || null;
  },

  async create({ companyId, firstName, lastName, email, passwordHash }) {
    const [result] = await pool.execute(
      `INSERT INTO users (company_id, first_name, last_name, email, password_hash, email_verified)
       VALUES (?, ?, ?, ?, ?, 0)`,
      [companyId, firstName, lastName, email, passwordHash]
    );
    return result.insertId;
  },

  async markEmailAsVerified(userId) {
    const [result] = await pool.execute(
      `UPDATE users SET email_verified = 1 WHERE id = ?`,
      [userId]
    );
    return result.affectedRows > 0;
  },

  async updatePassword(userId, passwordHash) {
    const [result] = await pool.execute(
      `UPDATE users SET password_hash = ? WHERE id = ?`,
      [passwordHash, userId]
    );
    return result.affectedRows > 0;
  },

  // Token management
  async createToken({ userId, type, expiresAt }) {
    // Generar token aleatorio seguro
    const token = crypto.randomBytes(32).toString("hex");

    const [result] = await pool.execute(
      `INSERT INTO user_tokens (user_id, token, type, expires_at)
       VALUES (?, ?, ?, ?)`,
      [userId, token, type, expiresAt]
    );

    return token;
  },

  async findTokenByToken(token, type) {
    const [rows] = await pool.execute(
      `SELECT ut.*, u.id as user_id, u.email, u.first_name, u.last_name, u.email_verified
       FROM user_tokens ut
       INNER JOIN users u ON ut.user_id = u.id
       WHERE ut.token = ? AND ut.type = ? AND ut.used_at IS NULL AND ut.expires_at > NOW()
       LIMIT 1`,
      [token, type]
    );
    return rows[0] || null;
  },

  async markTokenAsUsed(tokenId) {
    const [result] = await pool.execute(
      `UPDATE user_tokens SET used_at = NOW() WHERE id = ?`,
      [tokenId]
    );
    return result.affectedRows > 0;
  },

  async deleteExpiredTokens() {
    const [result] = await pool.execute(
      `DELETE FROM user_tokens WHERE expires_at < NOW() OR used_at IS NOT NULL`
    );
    return result.affectedRows;
  },

  async deleteTokensByUserAndType(userId, type) {
    const [result] = await pool.execute(
      `DELETE FROM user_tokens WHERE user_id = ? AND type = ?`,
      [userId, type]
    );
    return result.affectedRows;
  },
};
