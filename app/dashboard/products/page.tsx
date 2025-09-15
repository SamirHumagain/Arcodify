"use client";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/stores/useProducts";
import { Product } from "@/lib/types";
import { debounce } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { mockAddProduct, mockDeleteProduct } from "@/lib/api";

export default function AdminProductsPage() {
  const { products, fetchAll, addProductLocal, removeProductLocal } =
    useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const perPage = 8;

  useEffect(() => {
    if (!products.length) fetchAll();
  }, [fetchAll, products.length]);

  const setSearchDebounced = debounce((val: string) => {
    setSearch(val);
    setPage(1);
  }, 300);

  const filtered = useMemo(() => {
    let list = products;
    if (search)
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    if (category !== "all") list = list.filter((p) => p.category === category);
    return list;
  }, [products, search, category]);

  const pageCount = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleAdd = async () => {
    if (!title || !price || !desc || !cat) {
      toast.error("Fill all fields");
      return;
    }
    const newProduct: Product = {
      id: Date.now(),
      title,
      price: Number(price),
      description: desc,
      category: cat,
      image: "https://via.placeholder.com/150",
    };
    addProductLocal(newProduct);
    toast.success("Product added (mock)");
    setTitle("");
    setPrice("");
    setDesc("");
    setCat("");
    try {
      await mockAddProduct(newProduct);
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleRemove = async (id: number) => {
    const prevProducts = [...products];
    removeProductLocal(id);
    toast.success("Product removed (mock)");
    try {
      await mockDeleteProduct(id);
    } catch {
      toast.error("Failed to remove product");
      prevProducts.forEach((p) => addProductLocal(p));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
        Admin Products
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search"
          className="input w-40 rounded-md border border-zinc-300 dark:border-zinc-600"
          onChange={(e) => setSearchDebounced(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="input w-40 rounded-md border border-zinc-300 dark:border-zinc-600"
        >
          <option value="all">All</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>
      <div className="mb-6 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow border border-zinc-200 dark:border-zinc-700">
        <h2 className="font-bold mb-4 text-zinc-900 dark:text-white">
          Add Product (mock)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input rounded-md border border-zinc-300 dark:border-zinc-600"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="input rounded-md border border-zinc-300 dark:border-zinc-600"
            type="number"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="input rounded-md border border-zinc-300 dark:border-zinc-600"
          />
          <input
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            placeholder="Category"
            className="input rounded-md border border-zinc-300 dark:border-zinc-600"
          />
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
      {products.length === 0 ? (
        <table className="w-full border rounded-lg animate-pulse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 bg-gray-200 h-6 rounded" />
                <td className="p-2 bg-gray-200 h-6 rounded" />
                <td className="p-2 bg-gray-200 h-6 rounded" />
                <td className="p-2 bg-gray-200 h-6 rounded" />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-zinc-700">
              <th className="p-2 text-zinc-700 dark:text-zinc-200">Title</th>
              <th className="p-2 text-zinc-700 dark:text-zinc-200">Category</th>
              <th className="p-2 text-zinc-700 dark:text-zinc-200">Price</th>
              <th className="p-2 text-zinc-700 dark:text-zinc-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-blue-50 dark:hover:bg-zinc-800 transition"
              >
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2 font-semibold text-green-600 dark:text-green-400">
                  ${p.price}
                </td>
                <td className="p-2">
                  <button
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
                    onClick={() => handleRemove(p.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-50"
        >
          Prev
        </button>
        <div className="px-4 py-2 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold">
          Page {page} / {pageCount || 1}
        </div>
        <button
          disabled={page === pageCount}
          onClick={() => setPage((p) => p + 1)}
          className="btn px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
