import { pool } from "../config/db.js";

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
        cu.address AS customer_address
      FROM quotes q
      LEFT JOIN customers cu ON cu.id = q.customer_id
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

        c.id AS company_id,
        c.name AS company_name,
        c.email AS company_email,
        c.phone AS company_phone,
        c.address AS company_address,
        c.logo AS company_logo,

        cu.id AS customer_id,
        cu.name AS customer_name,
        cu.email AS customer_email,
        cu.phone AS customer_phone,
        cu.address AS customer_address

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

    // 2) Items
    const [items] = await pool.execute(
      `
      SELECT
        id,
        product_id,
        item_name,
        brand,
        quantity,
        unit_price,
        currency,
        discount_pct,
        line_total,
        sort_order
      FROM quote_items
      WHERE quote_id = :quoteId
      ORDER BY sort_order ASC, id ASC
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

      company: {
        id: header.company_id,
        name: header.company_name,
        email: header.company_email,
        phone: header.company_phone,
        address: header.company_address,
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
        SELECT id, name, brand
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
      const values = items.map((it, idx) => {
        const pid = Number(it.productId);
        const p = productMap.get(pid);

        const qty = Number(it.quantity);
        const unitPrice = Number(it.unitPrice);
        const discountPct = Number(it.discountPct ?? 0);

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
          it.currency ?? currency ?? "ARS",
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

      await conn.commit();
      return quoteId;
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  },
};
