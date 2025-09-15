"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../stores/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const initFromSession = useAuth((s: any) => s.initFromSession);
  const token = useAuth((s: any) => s.token);
  const userEmail = useAuth((s: any) => s.userEmail);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    initFromSession();
  }, [initFromSession]);

  useEffect(() => {
    if (typeof window !== "undefined" && !token) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  if (!token) return null;

  return (
    <div
      className={`p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <header className="mb-4 flex justify-between items-center">
        <span>Admin header — {userEmail || "No email found"}</span>
        <button
          className="btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Toggle Theme
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
}
