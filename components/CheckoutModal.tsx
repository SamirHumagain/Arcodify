"use client";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCart } from "../stores/useCart";
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
  const { clear, total, items } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutForm>();

  const onSubmit = (data: CheckoutForm) => {
    clear();
    reset();
    onClose();
    // Optionally show toast
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => (!open ? onClose() : undefined)}
    >
      <DialogContent>
        <DialogHeader>Checkout</DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <span className="text-red-500 text-xs">Address is required</span>
          )}
          <div className="mt-2">
            Total: <b>${total()}</b>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="btn"
              disabled={isSubmitting || !items.length}
            >
              Confirm & Pay
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
