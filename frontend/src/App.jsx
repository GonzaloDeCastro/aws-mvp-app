import AppLayout from "./layout/AppLayout";
import QuoteDetailPage from "./pages/QuoteDetailPage";

export default function App() {
  return (
    <AppLayout title="Quote">
      <QuoteDetailPage quoteId={2} />
    </AppLayout>
  );
}
