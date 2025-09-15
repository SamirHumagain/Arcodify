"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../stores/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const login = useAuth((s) => s.login);
  const router = useRouter();

  const onSubmit = (data: LoginInput) => {
    const token = "mock-token-" + Date.now();
    login(data.email, token);
    toast.success("Logged in");
    router.push("/dashboard/products");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 space-y-6 border border-zinc-200 dark:border-zinc-700"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-zinc-900 dark:text-white">
          Login
        </h2>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            {...register("email")}
            className="mt-1 input w-full rounded-md border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-400"
          />
          {formState.errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 input w-full rounded-md border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-400"
          />
          {formState.errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {formState.errors.password.message}
            </p>
          )}
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition"
          type="submit"
        >
          Login (mock)
        </button>
      </form>
    </div>
  );
}
