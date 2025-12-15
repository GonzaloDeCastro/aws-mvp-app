import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import AppShell from "./layout/AppShell";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import QuoteDetailPage from "./pages/QuoteDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import CustomersPage from "./pages/CustomersPage";
import QuoteCreatePage from "./pages/QuoteCreatePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/products" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppShell />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="quotes/:id" element={<QuoteDetailPage />} />
          <Route path="quotes/new" element={<QuoteCreatePage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route
            path="customers"
            element={<div style={{ padding: 8 }}>Customers (todo)</div>}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
