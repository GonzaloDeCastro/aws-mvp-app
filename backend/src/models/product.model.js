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
         COALESCE(
           CASE 
             WHEN EXISTS (
               SELECT 1 FROM product_components pc 
               WHERE pc.parent_product_id = p.id
             )
             THEN (
               SELECT SUM(comp.price * pc.qty)
               FROM product_components pc
               INNER JOIN products comp ON pc.component_product_id = comp.id
               WHERE pc.parent_product_id = p.id
             )
             ELSE p.price
           END,
           p.price
         ) as price,
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
         COALESCE(
           CASE 
             WHEN EXISTS (
               SELECT 1 FROM product_components pc 
               WHERE pc.parent_product_id = p.id
             )
             THEN (
               SELECT SUM(comp.price * pc.qty)
               FROM product_components pc
               INNER JOIN products comp ON pc.component_product_id = comp.id
               WHERE pc.parent_product_id = p.id
             )
             ELSE p.price
           END,
           p.price
         ) as price,
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
      // Si tiene componentes, el precio se calculará dinámicamente en las consultas SELECT
      // por lo que no necesitamos calcularlo ni actualizarlo aquí
      if (components && components.length > 0) {
        for (const comp of components) {
          await connection.execute(
            `INSERT INTO product_components (parent_product_id, component_product_id, qty)
             VALUES (?, ?, ?)`,
            [productId, comp.id, comp.qty || 1]
          );
        }
        // No actualizar el precio aquí - se calcula dinámicamente en las consultas SELECT
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

      // Verificar si este producto tiene componentes
      // Si tiene componentes, el precio se calcula dinámicamente en las consultas SELECT
      // por lo que no necesitamos actualizarlo aquí
      const [hasComponents] = await connection.execute(
        `SELECT COUNT(*) as count FROM product_components WHERE parent_product_id = ?`,
        [productId]
      );
      const isComposite = hasComponents[0]?.count > 0;

      // Si se están actualizando componentes, verificar si será compuesto después
      let willBeComposite = isComposite;
      if (components !== undefined) {
        willBeComposite = components.length > 0;
      }

      // Actualizar producto
      // Si tiene componentes o los tendrá, NO actualizar el precio (se calcula dinámicamente)
      // Si no tiene componentes, actualizar el precio normalmente
      const updateFields = [
        "sku = :sku",
        "name = :name",
        "brand = :brand",
        "description = :description",
        "stock_qty = :stockQty",
        "currency = :currency",
        "tax_id = :taxId",
        "is_active = :isActive",
      ];

      // Solo incluir precio si NO es un producto compuesto
      if (!willBeComposite) {
        updateFields.push("price = :price");
      }

      const [result] = await connection.execute(
        `UPDATE products
         SET ${updateFields.join(", ")}
         WHERE company_id = :companyId AND id = :productId`,
        {
          companyId,
          productId,
          sku,
          name,
          brand,
          description,
          stockQty,
          ...(willBeComposite ? {} : { price }),
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
        // Eliminar categorías existentes
        await connection.execute(
          `DELETE FROM product_categories WHERE product_id = ?`,
          [productId]
        );
        // Insertar nuevas categorías
        if (categoryIds && categoryIds.length > 0) {
          for (const catId of categoryIds) {
            await connection.execute(
              `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`,
              [productId, catId]
            );
          }
        }
      }

      // Actualizar componentes si se proporcionan
      if (components !== undefined) {
        // Eliminar componentes existentes
        await connection.execute(
          `DELETE FROM product_components WHERE parent_product_id = ?`,
          [productId]
        );
        // Insertar nuevos componentes
        if (components && components.length > 0) {
          for (const comp of components) {
            await connection.execute(
              `INSERT INTO product_components (parent_product_id, component_product_id, qty) VALUES (?, ?, ?)`,
              [productId, comp.id, comp.qty || 1]
            );
          }
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
