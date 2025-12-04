"use client";
import { useState, useEffect } from "react";

export default function CreateProductPage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("license");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.role !== "admin") {
      setMessage("No tienes permisos para crear productos.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id, // ✅ ahora se usa el admin logueado
          name,
          description,
          type,
        }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      // limpiar formulario si fue exitoso
      if (data.message) {
        setName("");
        setDescription("");
        setType("license");
      }
    } catch (error) {
      console.error("Error creando producto:", error);
      setMessage("Error al crear producto.");
    }
  };

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
      <h2 className="text-2xl font-bold mb-6">Crear nuevo producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="license">Licencia</option>
          <option value="display">Solo visual</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Crear producto
        </button>
        {message && <p className="mt-4 text-green-400">{message}</p>}
      </form>
    </div>
  );
}
