import { pool } from "../config/db.js";

export const ProductModel = {
  async listByCompany(companyId) {
    const [rows] = await pool.execute(
      `SELECT 
         p.id, 
         p.company_id, 
         p.sku, 
         p.name, 
         p.brand, 
         p.description, 
         p.stock_qty, 
         p.price, 
         p.currency, 
         p.tax_id, 
         p.is_active, 
         p.created_at,
         t.rate as tax_rate
       FROM products p
       LEFT JOIN taxes t ON p.tax_id = t.id AND t.is_active = 1
       WHERE p.company_id = :companyId
       ORDER BY p.id DESC`,
      { companyId }
    );
    return rows;
  },

  async getById({ companyId, productId }) {
    const [rows] = await pool.execute(
      `SELECT 
         p.id, 
         p.company_id, 
         p.sku, 
         p.name, 
         p.brand, 
         p.description, 
         p.stock_qty, 
         p.price, 
         p.currency, 
         p.tax_id, 
         p.is_active, 
         p.created_at,
         t.rate as tax_rate
       FROM products p
       LEFT JOIN taxes t ON p.tax_id = t.id AND t.is_active = 1
       WHERE p.company_id = :companyId AND p.id = :productId
       LIMIT 1`,
      { companyId, productId }
    );
    return rows[0] ?? null;
  },

  async getCategories(productId) {
    const [rows] = await pool.execute(
      `SELECT c.id, c.name
       FROM product_categories pc
       INNER JOIN categories c ON pc.category_id = c.id
       WHERE pc.product_id = ?`,
      [productId]
    );
    return rows;
  },

  async getComponents(productId) {
    const [rows] = await pool.execute(
      `SELECT 
         pc.component_product_id as id,
         p.name,
         p.price,
         pc.qty
       FROM product_components pc
       INNER JOIN products p ON pc.component_product_id = p.id
       WHERE pc.parent_product_id = ?
       ORDER BY p.name ASC`,
      [productId]
    );
    return rows;
  },

  async setCategories(productId, categoryIds) {
    // Eliminar categorías existentes
    await pool.execute(`DELETE FROM product_categories WHERE product_id = ?`, [
      productId,
    ]);

    // Insertar nuevas categorías
    if (categoryIds && categoryIds.length > 0) {
      for (const catId of categoryIds) {
        await pool.execute(
          `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`,
          [productId, catId]
        );
      }
    }
  },

  async setComponents(productId, components) {
    // Eliminar componentes existentes
    await pool.execute(
      `DELETE FROM product_components WHERE parent_product_id = ?`,
      [productId]
    );

    // Insertar nuevos componentes
    if (components && components.length > 0) {
      for (const comp of components) {
        await pool.execute(
          `INSERT INTO product_components (parent_product_id, component_product_id, qty) VALUES (?, ?, ?)`,
          [productId, comp.id, comp.qty || 1]
        );
      }
    }
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
    taxId = null,
    categoryIds = [],
    components = [],
  }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insertar producto
      const [result] = await connection.execute(
        `INSERT INTO products (company_id, sku, name, brand, description, stock_qty, price, currency, tax_id)
         VALUES (:companyId, :sku, :name, :brand, :description, :stockQty, :price, :currency, :taxId)`,
        {
          companyId,
          sku,
          name,
          brand,
          description,
          stockQty,
          price,
          currency,
          taxId: taxId || null,
        }
      );
      const productId = result.insertId;

      // Insertar categorías si existen
      if (categoryIds && categoryIds.length > 0) {
        const placeholders = categoryIds
          .map(() => `(:productId, ?)`)
          .join(", ");
        const values = categoryIds.map((catId) => [productId, catId]);
        for (const [prodId, catId] of values) {
          await connection.execute(
            `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`,
            [prodId, catId]
          );
        }
      }

      // Insertar componentes si existen
      // Nota: Si tiene componentes, el precio se calculará automáticamente por el trigger
      if (components && components.length > 0) {
        for (const comp of components) {
          await connection.execute(
            `INSERT INTO product_components (parent_product_id, component_product_id, qty)
             VALUES (?, ?, ?)`,
            [productId, comp.id, comp.qty || 1]
          );
        }
        // Llamar al stored procedure para recalcular el precio
        await connection.execute(`CALL sp_recalc_composite_price(?)`, [
          productId,
        ]);
      }

      await connection.commit();
      return productId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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
    taxId,
    isActive,
    categoryIds,
    components,
  }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Actualizar producto
      // Nota: Si tiene componentes, el precio se recalculará automáticamente por el trigger
      const [result] = await connection.execute(
        `UPDATE products
         SET sku = :sku,
             name = :name,
             brand = :brand,
             description = :description,
             stock_qty = :stockQty,
             price = :price,
             currency = :currency,
             tax_id = :taxId,
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
          taxId: taxId !== undefined ? taxId || null : undefined,
          isActive,
        }
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        return 0;
      }

      // Actualizar categorías si se proporcionan
      if (categoryIds !== undefined) {
        await this.setCategories(productId, categoryIds);
      }

      // Actualizar componentes si se proporcionan
      if (components !== undefined) {
        await this.setComponents(productId, components);
        // Si tiene componentes, recalcular precio
        if (components.length > 0) {
          await connection.execute(`CALL sp_recalc_composite_price(?)`, [
            productId,
          ]);
        }
      }

      await connection.commit();
      return result.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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
