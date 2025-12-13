import { pool } from "../config/db.js";

export const QuoteModel = {
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
};
