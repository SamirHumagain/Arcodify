"use client";
import { useCart } from "../stores/useCart";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function FloatingCartButton() {
  const items = useCart((s) => s.items);
  const qty = items.reduce((a, b) => a + b.quantity, 0);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg"
      >
        Cart ({qty})
      </button>
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
