"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProducts } from "@/stores/useProducts";
import { useCart } from "@/stores/useCart";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id);
  const { fetchById, products } = useProducts();
  const addToCart = useCart((s: any) => s.add);
  const [product, setProduct] = useState<import("@/lib/types").Product | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    fetchById(productId).then((p: import("@/lib/types").Product | null) => {
      setProduct(p);
      setLoading(false);
    });
  }, [productId, fetchById]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 p-6 border border-zinc-200 dark:border-zinc-800">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 w-72 object-contain rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-2 text-zinc-900 dark:text-white">
            {product.title}
          </h1>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
            {product.category}
          </span>
          <div className="mb-4 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
            {product.description}
          </div>
          <div className="font-bold text-2xl mb-4 text-green-600 dark:text-green-400">
            ${product.price}
          </div>
          {product.rating && (
            <div className="flex items-center gap-2 text-sm text-yellow-600 mb-4">
              <svg
                className="w-5 h-5 inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
              </svg>
              <span className="font-semibold">{product.rating.rate}</span>
              <span className="text-zinc-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}
          <button
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:scale-105 transition mt-2 w-fit"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
