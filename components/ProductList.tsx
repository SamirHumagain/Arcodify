"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useProducts } from "../stores/useProducts";
import ProductCard from "./ProductCard";
import { debounce } from "../lib/helpers";

export default function ProductList() {
  const { products, fetchAll, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    if (!products.length) fetchAll();
  }, [fetchAll, products.length]);

  // Debounced search setter
  const setSearchDebounced = useCallback(
    debounce((val: string) => {
      setSearch(val);
      setPage(1);
    }, 300),
    []
  );

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

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearchDebounced(e.target.value)}
          placeholder="Search"
          className="input"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="input"
        >
          <option value="all">All</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn"
            >
              Prev
            </button>
            <div>
              Page {page} / {pageCount || 1}
            </div>
            <button
              disabled={page === pageCount}
              onClick={() => setPage((p) => p + 1)}
              className="btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
