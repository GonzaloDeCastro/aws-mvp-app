import { pool } from "../config/db.js";

export const ProductModel = {
  async listByCompany(companyId) {
    const [rows] = await pool.execute(
      `SELECT id, company_id, sku, name, brand, description, stock_qty, price, currency, is_active, created_at
       FROM products
       WHERE company_id = :companyId
       ORDER BY id DESC`,
      { companyId }
    );
    return rows;
  },

  async getById({ companyId, productId }) {
    const [rows] = await pool.execute(
      `SELECT id, company_id, sku, name, brand, description, stock_qty, price, currency, is_active, created_at
       FROM products
       WHERE company_id = :companyId AND id = :productId
       LIMIT 1`,
      { companyId, productId }
    );
    return rows[0] ?? null;
  },

  async create({
    companyId,
    sku,
    name,
    brand,
    description,
    stockQty,
    price,
    currency,
  }) {
    const [result] = await pool.execute(
      `INSERT INTO products (company_id, sku, name, brand, description, stock_qty, price, currency)
       VALUES (:companyId, :sku, :name, :brand, :description, :stockQty, :price, :currency)`,
      { companyId, sku, name, brand, description, stockQty, price, currency }
    );
    return result.insertId;
  },

  async update({
    companyId,
    productId,
    sku,
    name,
    brand,
    description,
    stockQty,
    price,
    currency,
    isActive,
  }) {
    const [result] = await pool.execute(
      `UPDATE products
       SET sku = :sku,
           name = :name,
           brand = :brand,
           description = :description,
           stock_qty = :stockQty,
           price = :price,
           currency = :currency,
           is_active = :isActive
       WHERE company_id = :companyId AND id = :productId`,
      {
        companyId,
        productId,
        sku,
        name,
        brand,
        description,
        stockQty,
        price,
        currency,
        isActive,
      }
    );
    return result.affectedRows;
  },

  async remove({ companyId, productId }) {
    const [result] = await pool.execute(
      `DELETE FROM products
       WHERE company_id = :companyId AND id = :productId`,
      { companyId, productId }
    );
    return result.affectedRows;
  },
};
