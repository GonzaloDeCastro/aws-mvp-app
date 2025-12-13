import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/app/products">Go to Products</Link>
    </div>
  );
}
