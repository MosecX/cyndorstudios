"use client";
import { useEffect, useState } from "react";

export default function ManageProductsPage() {
  const [user, setUser] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserAndAssignments = async () => {
      try {
        // Verificar usuario
        const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          credentials: "include",
        });
        const dataUser = await resUser.json();
        setUser(dataUser.user);

        // Solo admins cargan asignaciones
        if (dataUser.user?.role === "admin") {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/manage`);
          const data = await res.json();
          setAssignments(data);
        }
      } catch (error) {
        console.error("Error cargando usuario/asignaciones:", error);
      }
    };
    fetchUserAndAssignments();
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
        <p className="text-red-500">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Gestionar productos/licencias</h1>

      {message && <p className="mb-4 text-green-400">{message}</p>}

      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-neutral-800">
          <tr>
            <th className="px-4 py-2 text-left">Usuario</th>
            <th className="px-4 py-2 text-left">Producto</th>
            <th className="px-4 py-2 text-left">Licencia</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                No hay asignaciones todavía.
              </td>
            </tr>
          ) : (
            assignments.map((a) => (
              <tr key={a.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{a.username}</td>
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2 text-green-400">{a.license_key}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/revoke`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: a.id }),
                        });
                        const data = await res.json();
                        setMessage(data.message || data.error);
                        setAssignments((prev) => prev.filter((x) => x.id !== a.id));
                      } catch (error) {
                        console.error("Error revocando producto:", error);
                        setMessage("Error al revocar producto.");
                      }
                    }}
                    className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition"
                  >
                    Revocar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
