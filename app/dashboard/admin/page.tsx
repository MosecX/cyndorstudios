"use client";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<{ users: number; products: number; licenses: number }>({
    users: 0,
    products: 0,
    licenses: 0,
  });

  useEffect(() => {
    const fetchUserAndStats = async () => {
      // Verificar usuario
      const resUser = await fetch("/api/me", { credentials: "include" });
      const dataUser = await resUser.json();
      setUser(dataUser.user);

      // Cargar estadísticas
      const resStats = await fetch("/api/stats");
      const dataStats = await resStats.json();
      setStats(dataStats);
    };

    fetchUserAndStats();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-8">
        <p className="text-red-500">No tienes sesión iniciada.</p>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-8">
        <p className="text-red-500">No tienes permisos para acceder al panel de admin.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      {/* Botones de gestión */}
      <div className="flex gap-4 mb-8">
        <a
          href="/dashboard/products/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Crear producto
        </a>
        <a
          href="/dashboard/products/assign"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Asignar producto a usuario
        </a>
        <a
          href="/dashboard/products/manage"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Gestionar productos/licencias
        </a>
      </div>

      {/* Estadísticas rápidas */}
      <div className="bg-neutral-900 border border-gray-700 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Estadísticas rápidas</h2>
        <p className="text-gray-300">
          Usuarios registrados: <span className="text-white font-bold">{stats.users}</span>
        </p>
        <p className="text-gray-300">
          Productos creados: <span className="text-white font-bold">{stats.products}</span>
        </p>
        <p className="text-gray-300">
          Licencias activas: <span className="text-white font-bold">{stats.licenses}</span>
        </p>
      </div>
    </div>
  );
}
