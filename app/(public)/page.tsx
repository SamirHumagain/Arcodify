import ProductList from "../../components/ProductList";

export default function ProductsFrontPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Storefront</h1>
      <ProductList />
    </main>
  );
}
