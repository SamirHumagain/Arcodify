"use client";
import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { debounce } from "@/lib/helpers";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<User[]>("/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  const setSearchDebounced = debounce((val: string) => {
    setSearch(val);
  }, 300);

  const filtered = useMemo(() => {
    if (!search) return users;
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        (u.name.firstname + " " + u.name.lastname)
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Users</h1>
      <input
        placeholder="Search users"
        className="input mb-4"
        onChange={(e) => setSearchDebounced(e.target.value)}
      />
      {loading ? (
        <table className="w-full border rounded-lg animate-pulse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 bg-gray-200 h-6 rounded" />
                <td className="p-2 bg-gray-200 h-6 rounded" />
                <td className="p-2 bg-gray-200 h-6 rounded" />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.username}</td>
                <td className="p-2">
                  {u.name.firstname} {u.name.lastname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
