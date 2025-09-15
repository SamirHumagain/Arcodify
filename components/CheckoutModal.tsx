"use client";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CheckoutModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutForm>();
  const [success, setSuccess] = useState(false);

  // Get cart from localStorage
  const cart =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
  const total = cart.reduce(
    (acc: number, item: any) => acc + item.product.price * item.quantity,
    0
  );

  const onSubmit = (data: CheckoutForm) => {
    localStorage.removeItem("cart");
    reset();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => (!open ? onClose() : undefined)}
    >
      <DialogContent>
        <DialogHeader>Checkout</DialogHeader>
        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="text-green-600 text-xl font-bold">
              Payment Successful!
            </div>
            <div className="text-gray-500">Thank you for your purchase.</div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="font-semibold mb-2">Cart Summary</div>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-2 bg-zinc-50">
                {cart.length === 0 ? (
                  <div className="text-gray-400">Your cart is empty.</div>
                ) : (
                  cart.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1 border-b last:border-b-0"
                    >
                      <div>
                        {item.product.title}{" "}
                        <span className="text-xs text-gray-500 ml-2">
                          x{item.quantity}
                        </span>
                      </div>
                      <div>${item.product.price * item.quantity}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-2 text-right">
                <span className="font-bold">Total: ${total}</span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="input"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                className="input"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
              <input
                {...register("address", { required: true })}
                placeholder="Address"
                className="input"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  Address is required
                </span>
              )}
              <DialogFooter>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-green-600 active:scale-100 transition-all duration-150"
                  disabled={isSubmitting || !cart.length}
                >
                  Confirm & Pay
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 active:scale-100 ml-2 transition-all duration-150"
                  onClick={() => {
                    localStorage.removeItem("cart");
                    reset();
                  }}
                  disabled={!cart.length}
                >
                  Clear
                </button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
