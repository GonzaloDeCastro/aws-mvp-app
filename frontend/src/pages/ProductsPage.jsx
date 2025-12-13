import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return <div style={{ color: "crimson" }}>{error}</div>;

  return (
    <div>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}
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
          {items.map((p) => (
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
