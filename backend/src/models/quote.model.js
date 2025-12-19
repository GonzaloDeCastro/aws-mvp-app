import { pool } from "../config/db.js";
import { HttpError } from "../utils/httpError.js";

export const QuoteModel = {
  async listByCompany(companyId) {
    const [rows] = await pool.execute(
      `
      SELECT
        q.id,
        q.company_id,
        q.quote_number,
        q.status,
        q.currency,
        q.valid_until,
        q.created_at,

        cu.id AS customer_id,
        cu.name AS customer_name,
        cu.email AS customer_email,
        cu.phone AS customer_phone,
        cu.address AS customer_address,
        
        COALESCE(q.total_with_tax_ars, 0) AS total_with_tax
      FROM quotes q
      LEFT JOIN customers cu ON cu.id = q.customer_id
      LEFT JOIN companies c ON c.id = q.company_id
      WHERE q.company_id = :companyId
      ORDER BY q.created_at DESC, q.id DESC
      `,
      { companyId }
    );

    return rows.map((row) => ({
      id: row.id,
      companyId: row.company_id,
      quoteNumber: row.quote_number,
      status: row.status,
      currency: row.currency,
      validUntil: row.valid_until,
      createdAt: row.created_at,
      totalWithTax: Number(row.total_with_tax) || 0,
      customer: row.customer_id
        ? {
            id: row.customer_id,
            name: row.customer_name,
            email: row.customer_email,
            phone: row.customer_phone,
            address: row.customer_address,
          }
        : null,
    }));
  },

  async getById({ companyId, quoteId }) {
    // 1) Header + company + customer
    const [headerRows] = await pool.execute(
      `
      SELECT
        q.id,
        q.company_id,
        q.quote_number,
        q.status,
        q.currency,
        q.notes,
        q.valid_until,
        q.created_at,
        q.dollar_rate_used,

        c.id AS company_id,
        c.name AS company_name,
        c.email AS company_email,
        c.phone AS company_phone,
        c.address AS company_address,
        c.tax_id AS company_tax_id,
        c.logo AS company_logo,

        cu.id AS customer_id,
        cu.name AS customer_name,
        cu.email AS customer_email,
        cu.phone AS customer_phone,
        cu.address AS customer_address,
        cu.tax_id AS customer_tax_id

      FROM quotes q
      JOIN companies c ON c.id = q.company_id
      LEFT JOIN customers cu ON cu.id = q.customer_id
      WHERE q.company_id = :companyId AND q.id = :quoteId
      LIMIT 1
      `,
      { companyId, quoteId }
    );

    const header = headerRows[0];
    if (!header) return null;

    // 2) Items con tax information
    const [items] = await pool.execute(
      `
      SELECT
        qi.id,
        qi.product_id,
        qi.item_name,
        qi.brand,
        qi.quantity,
        qi.unit_price,
        qi.currency,
        qi.discount_pct,
        qi.line_total,
        qi.sort_order,
        t.id AS tax_id,
        t.name AS tax_name,
        t.rate AS tax_rate,
        ROUND(qi.line_total * (COALESCE(t.rate, 0) / 100), 2) AS tax_amount,
        ROUND(qi.line_total * (1 + COALESCE(t.rate, 0) / 100), 2) AS gross_line_total
      FROM quote_items qi
      LEFT JOIN products p ON p.id = qi.product_id
      LEFT JOIN taxes t ON t.id = p.tax_id AND t.is_active = 1
      WHERE qi.quote_id = :quoteId
      ORDER BY qi.sort_order ASC, qi.id ASC
      `,
      { quoteId }
    );

    return {
      id: header.id,
      companyId: header.company_id,
      quoteNumber: header.quote_number,
      status: header.status,
      currency: header.currency,
      notes: header.notes,
      validUntil: header.valid_until,
      createdAt: header.created_at,
      dollarRateUsed: header.dollar_rate_used
        ? Number(header.dollar_rate_used)
        : null,

      company: {
        id: header.company_id,
        name: header.company_name,
        email: header.company_email,
        phone: header.company_phone,
        address: header.company_address,
        taxId: header.company_tax_id,
        logo:
          header.company_logo && Buffer.isBuffer(header.company_logo)
            ? header.company_logo.toString("base64")
            : null,
      },

      customer: header.customer_id
        ? {
            id: header.customer_id,
            name: header.customer_name,
            email: header.customer_email,
            phone: header.customer_phone,
            address: header.customer_address,
            taxId: header.customer_tax_id,
          }
        : null,

      items,
    };
  },

  async createWithItems({
    companyId,
    createdByUserId,
    customerId,
    currency,
    validUntil,
    items,
  }) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new HttpError(
        400,
        "items is required and must be a non-empty array"
      );
    }

    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      // 0) Obtener dollar_rate de la compañía para calcular el total fijo
      const [companyRows] = await conn.execute(
        `SELECT dollar_rate FROM companies WHERE id = ? LIMIT 1`,
        [companyId]
      );
      const dollarRate = companyRows[0]?.dollar_rate || 1470;

      // 1) Insert header with a temporary quote_number
      const [qRes] = await conn.execute(
        `
        INSERT INTO quotes
          (company_id, quote_number, created_by_user_id, customer_id, status, currency, valid_until)
        VALUES
          (?, '0000000', ?, ?, 'DRAFT', ?, ?)
        `,
        [
          companyId,
          createdByUserId,
          customerId ?? null,
          currency ?? "ARS",
          validUntil ?? null,
        ]
      );

      const quoteId = qRes.insertId;

      // 2) Set quote_number based on quoteId (no self-select)
      await conn.execute(
        `UPDATE quotes SET quote_number = LPAD(?, 7, '0') WHERE id = ? AND company_id = ?`,
        [quoteId, quoteId, companyId]
      );

      // 3) Fetch products snapshot in ONE query (instead of one SELECT per item)
      const productIds = [...new Set(items.map((it) => Number(it.productId)))];
      if (productIds.some((id) => !id))
        throw new HttpError(400, "Invalid productId in items");

      const placeholders = productIds.map(() => "?").join(",");
      const [pRows] = await conn.execute(
        `
        SELECT id, name, brand, tax_id
        FROM products
        WHERE company_id = ? AND is_active = 1 AND id IN (${placeholders})
        `,
        [companyId, ...productIds]
      );

      const productMap = new Map(pRows.map((p) => [p.id, p]));
      for (const it of items) {
        const pid = Number(it.productId);
        if (!productMap.has(pid)) {
          throw new HttpError(400, `Invalid productId: ${it.productId}`);
        }
      }

      // 4) Bulk insert quote_items (VALUES ?)
      // Nota: line_total se guarda en la moneda original del item
      const values = items.map((it, idx) => {
        const pid = Number(it.productId);
        const p = productMap.get(pid);

        const qty = Number(it.quantity);
        const unitPrice = Number(it.unitPrice);
        const discountPct = Number(it.discountPct ?? 0);
        const itemCurrency = it.currency ?? currency ?? "ARS";

        if (!Number.isFinite(qty) || qty <= 0)
          throw new HttpError(400, "quantity must be > 0");
        if (!Number.isFinite(unitPrice) || unitPrice < 0)
          throw new HttpError(400, "unitPrice must be >= 0");
        if (!Number.isFinite(discountPct) || discountPct < 0)
          throw new HttpError(400, "discountPct must be >= 0");

        const gross = qty * unitPrice;
        const disc = gross * (discountPct / 100);
        const lineTotal = Number((gross - disc).toFixed(2));

        return [
          quoteId,
          pid,
          p.name,
          p.brand ?? null,
          qty,
          unitPrice,
          itemCurrency,
          discountPct,
          lineTotal,
          Number(it.sortOrder ?? idx + 1),
        ];
      });

      await conn.query(
        `
        INSERT INTO quote_items
          (quote_id, product_id, item_name, brand, quantity, unit_price, currency, discount_pct, line_total, sort_order)
        VALUES ?
        `,
        [values]
      );

      // 5) Calcular total_with_tax_ars usando los items insertados, convirtiendo USD a ARS
      const [totalRows] = await conn.execute(
        `
        SELECT COALESCE(
          SUM(
            ROUND(
              CASE
                WHEN qi.currency = 'USD' THEN qi.line_total * :dollarRate
                ELSE qi.line_total
              END * (1 + COALESCE(t.rate, 0) / 100), 2
            )
          ), 0
        ) AS total_with_tax_ars
        FROM quote_items qi
        LEFT JOIN products p ON p.id = qi.product_id
        LEFT JOIN taxes t ON t.id = p.tax_id AND t.is_active = 1
        WHERE qi.quote_id = :quoteId
        `,
        { quoteId, dollarRate }
      );

      const totalWithTaxArs = Number(totalRows[0]?.total_with_tax_ars || 0);

      // 6) Actualizar el quote con el total calculado y el dólar usado
      await conn.execute(
        `UPDATE quotes SET total_with_tax_ars = ?, dollar_rate_used = ? WHERE id = ? AND company_id = ?`,
        [totalWithTaxArs, dollarRate, quoteId, companyId]
      );

      await conn.commit();
      return quoteId;
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  },

  async updateWithItems({
    companyId,
    quoteId,
    customerId,
    currency,
    validUntil,
    items,
  }) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new HttpError(
        400,
        "items is required and must be a non-empty array"
      );
    }

    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      // 0) Verificar que el quote existe y obtener el dollar_rate_used
      const [quoteRows] = await conn.execute(
        `SELECT id, dollar_rate_used FROM quotes WHERE id = ? AND company_id = ? LIMIT 1`,
        [quoteId, companyId]
      );
      if (quoteRows.length === 0) {
        throw new HttpError(404, "Quote not found");
      }

      // 1) Usar el dollar_rate_used guardado (no cambiar el dólar de referencia)
      // Si no existe (presupuestos antiguos), obtener el actual pero no guardarlo
      let dollarRate = quoteRows[0]?.dollar_rate_used;
      if (!dollarRate) {
        // Para presupuestos antiguos sin dollar_rate_used, usar el actual
        const [companyRows] = await conn.execute(
          `SELECT dollar_rate FROM companies WHERE id = ? LIMIT 1`,
          [companyId]
        );
        dollarRate = companyRows[0]?.dollar_rate || 1470;
      }

      // 2) Actualizar header del quote
      await conn.execute(
        `
        UPDATE quotes
        SET customer_id = ?, currency = ?, valid_until = ?
        WHERE id = ? AND company_id = ?
        `,
        [
          customerId ?? null,
          currency ?? "ARS",
          validUntil ?? null,
          quoteId,
          companyId,
        ]
      );

      // 3) Eliminar items existentes
      await conn.execute(`DELETE FROM quote_items WHERE quote_id = ?`, [
        quoteId,
      ]);

      // 4) Fetch products snapshot
      const productIds = [...new Set(items.map((it) => Number(it.productId)))];
      if (productIds.some((id) => !id))
        throw new HttpError(400, "Invalid productId in items");

      const placeholders = productIds.map(() => "?").join(",");
      const [pRows] = await conn.execute(
        `
        SELECT id, name, brand, tax_id
        FROM products
        WHERE company_id = ? AND is_active = 1 AND id IN (${placeholders})
        `,
        [companyId, ...productIds]
      );

      const productMap = new Map(pRows.map((p) => [p.id, p]));
      for (const it of items) {
        const pid = Number(it.productId);
        if (!productMap.has(pid)) {
          throw new HttpError(400, `Invalid productId: ${it.productId}`);
        }
      }

      // 5) Bulk insert nuevos quote_items
      const values = items.map((it, idx) => {
        const pid = Number(it.productId);
        const p = productMap.get(pid);

        const qty = Number(it.quantity);
        const unitPrice = Number(it.unitPrice);
        const discountPct = Number(it.discountPct ?? 0);
        const itemCurrency = it.currency ?? currency ?? "ARS";

        if (!Number.isFinite(qty) || qty <= 0)
          throw new HttpError(400, "quantity must be > 0");
        if (!Number.isFinite(unitPrice) || unitPrice < 0)
          throw new HttpError(400, "unitPrice must be >= 0");
        if (!Number.isFinite(discountPct) || discountPct < 0)
          throw new HttpError(400, "discountPct must be >= 0");

        const gross = qty * unitPrice;
        const disc = gross * (discountPct / 100);
        const lineTotal = Number((gross - disc).toFixed(2));

        return [
          quoteId,
          pid,
          p.name,
          p.brand ?? null,
          qty,
          unitPrice,
          itemCurrency,
          discountPct,
          lineTotal,
          Number(it.sortOrder ?? idx + 1),
        ];
      });

      await conn.query(
        `
        INSERT INTO quote_items
          (quote_id, product_id, item_name, brand, quantity, unit_price, currency, discount_pct, line_total, sort_order)
        VALUES ?
        `,
        [values]
      );

      // 6) Calcular total_with_tax_ars usando los items insertados, convirtiendo USD a ARS
      const [totalRows] = await conn.execute(
        `
        SELECT COALESCE(
          SUM(
            ROUND(
              CASE
                WHEN qi.currency = 'USD' THEN qi.line_total * :dollarRate
                ELSE qi.line_total
              END * (1 + COALESCE(t.rate, 0) / 100), 2
            )
          ), 0
        ) AS total_with_tax_ars
        FROM quote_items qi
        LEFT JOIN products p ON p.id = qi.product_id
        LEFT JOIN taxes t ON t.id = p.tax_id AND t.is_active = 1
        WHERE qi.quote_id = :quoteId
        `,
        { quoteId, dollarRate }
      );

      const totalWithTaxArs = Number(totalRows[0]?.total_with_tax_ars || 0);

      // 7) Actualizar el quote con el total calculado
      await conn.execute(
        `UPDATE quotes SET total_with_tax_ars = ? WHERE id = ? AND company_id = ?`,
        [totalWithTaxArs, quoteId, companyId]
      );

      await conn.commit();
      return quoteId;
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  },

  async remove({ companyId, quoteId }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Eliminar items primero (por foreign key)
      await connection.execute(`DELETE FROM quote_items WHERE quote_id = ?`, [
        quoteId,
      ]);

      // Eliminar el quote
      const [result] = await connection.execute(
        `DELETE FROM quotes WHERE company_id = ? AND id = ?`,
        [companyId, quoteId]
      );

      await connection.commit();
      return result.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};
