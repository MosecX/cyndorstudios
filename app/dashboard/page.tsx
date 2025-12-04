"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [ping, setPing] = useState<number | null>(null);
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        const data = await res.json();
        setUser(data.user);

        if (data.user) {
          const resProducts = await fetch("/api/products/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data.user.id }),
          });
          if (resProducts.ok) {
            const dataProducts = await resProducts.json();
            setProducts(dataProducts);
          }
        }
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      }
    };

    const measurePing = async () => {
      try {
        const start = performance.now();
        const res = await fetch("/api/ping");
        const data = await res.json();
        const end = performance.now();

        setPing(Math.round(end - start));
        setVersion(data.version || "1.0.0");
      } catch (error) {
        console.error("Error midiendo ping:", error);
      }
    };

    fetchUserAndProducts();
    measurePing();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-8">
      {user ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-lg text-gray-300">
              Hola,{" "}
              <span className="font-semibold text-blue-400">{user.username}</span>
            </p>
          </div>

          {/* Productos */}
          <div className="bg-neutral-900 border border-gray-700 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Tus productos</h2>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={`${product.id}-${product.license_key || index}`}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition"
                  >
                    <h3 className="text-xl font-bold text-blue-400">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 mt-2">{product.description}</p>

                    {product.type === "license" && (
                      <p className="text-green-400 text-sm mt-2">
                        Licencia: {product.license_key}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-12">
                No tienes productos adquiridos todavía.
              </p>
            )}
          </div>

          {/* Footer extra SOLO en Dashboard */}
          <div className="bg-neutral-900 border-t border-gray-700 text-gray-400 text-sm p-4 mt-12">
            <div className="flex justify-between items-center">
              <p>Versión del Dashboard: {version}</p>
              <p>Ping: {ping ?? "--"} ms</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-center mt-20">
          No tienes sesión iniciada.
        </p>
      )}
    </div>
  );
}
