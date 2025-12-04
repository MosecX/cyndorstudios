"use client";
import { useEffect, useState } from "react";

export default function AccountPanel() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [user, setUser] = useState<any>(null);
  const [licenses, setLicenses] = useState<any[]>([]);

  // Fetch usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch licencias
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/licenses`, {
          credentials: "include",
        });
        const data = await res.json();
        setLicenses(data);
      } catch (error) {
        console.error("Error obteniendo licencias:", error);
      }
    };
    fetchLicenses();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 bg-neutral-900 rounded-[32px] shadow-2xl border border-gray-700 p-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar vertical */}
      <div className="lg:w-1/4 space-y-4">
        {["perfil", "licencias", "seguridad"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab === "perfil" && "🧑 Perfil"}
            {tab === "licencias" && "🎧 Licencias"}
            {tab === "seguridad" && "🔒 Seguridad"}
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1">
        {/* Perfil */}
        {activeTab === "perfil" && user && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Perfil</h2>
            <p className="text-gray-300">
              Usuario: <span className="text-blue-400">{user.username}</span>
            </p>
            <p className="text-gray-300">Correo: {user.email}</p>
            <p className="text-gray-300">Rol: {user.role}</p>
            <p className="text-gray-300">
              Registrado: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Licencias */}
        {activeTab === "licencias" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Productos / Licencias</h2>
            {licenses.length === 0 ? (
              <p className="text-gray-400">No tienes productos asignados.</p>
            ) : (
              <ul className="space-y-2 text-gray-300">
                {licenses.map((lic, i) => (
                  <li key={i}>
                    Producto #{lic.product_id} —{" "}
                    {lic.license_key ? `Licencia: ${lic.license_key}` : "Producto"} —{" "}
                    Asignado: {new Date(lic.assigned_at).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Seguridad */}
        {activeTab === "seguridad" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Seguridad</h2>

            {/* Formulario cambiar contraseña */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const actual = e.currentTarget.actual.value;
                const nueva = e.currentTarget.nueva.value;

                try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ actual, nueva }),
                  });

                  const data = await res.json();
                  alert(data.message || data.error);
                } catch (error) {
                  console.error("Error cambiando contraseña:", error);
                  alert("Error al cambiar contraseña.");
                }
              }}
              className="space-y-4"
            >
              <input
                type="password"
                name="actual"
                placeholder="Contraseña actual"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              />
              <input
                type="password"
                name="nueva"
                placeholder="Nueva contraseña"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700"
              >
                Cambiar contraseña
              </button>
            </form>

            {/* Botón cerrar sesión */}
            <button
              onClick={async () => {
                try {
                  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                  window.location.href = "/login";
                } catch (error) {
                  console.error("Error cerrando sesión:", error);
                }
              }}
              className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
