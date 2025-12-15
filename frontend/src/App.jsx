import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import AppShell from "./layout/AppShell";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import QuotesPage from "./pages/QuotesPage";
import QuoteDetailPage from "./pages/QuoteDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import CustomersPage from "./pages/CustomersPage";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import QuoteCreatePage from "./pages/QuoteCreatePage";
import CompanyPage from "./pages/CompanyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/products" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppShell />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductCreatePage />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="quotes/:id" element={<QuoteDetailPage />} />
          <Route path="quotes/new" element={<QuoteCreatePage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/new" element={<CustomerCreatePage />} />
          <Route path="company" element={<CompanyPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
