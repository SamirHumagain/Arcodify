import { Product } from "../lib/types";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="border rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-32 object-contain mb-2"
      />
      <div className="font-bold text-lg">{product.title}</div>
      <div className="text-sm text-gray-500">{product.category}</div>
      <div className="font-semibold">${product.price}</div>
      {product.rating && (
        <div className="text-xs text-yellow-600">
          Rating: {product.rating.rate} ({product.rating.count})
        </div>
      )}
    </Link>
  );
}
