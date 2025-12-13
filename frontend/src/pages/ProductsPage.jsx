import { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setStatus({ loading: true, error: "" });
        const json = await apiGet("/products");
        if (!alive) return;
        setProducts(json.data ?? []);
        setStatus({ loading: false, error: "" });
      } catch (e) {
        if (!alive) return;
        setStatus({
          loading: false,
          error: e.message || "Error loading products",
        });
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  if (status.loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (status.error)
    return <div style={{ padding: 20, color: "crimson" }}>{status.error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      <table
        border="1"
        cellPadding="8"
        style={{
          fontSize: 14,
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Currency</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.sku || "-"}</td>
              <td>{p.name}</td>
              <td>{p.brand || "-"}</td>
              <td>{p.stock_qty}</td>
              <td>{p.price}</td>
              <td>{p.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
