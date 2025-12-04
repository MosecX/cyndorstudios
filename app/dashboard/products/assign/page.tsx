"use client";
import { useEffect, useState } from "react";

export default function AssignProductPage() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el usuario logueado
        const resMe = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          credentials: "include",
        });
        const dataMe = await resMe.json();
        setUser(dataMe.user);

        // Obtener usuarios y productos
        const resUsers = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/list`);
        const resProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/list`);

        const usersData = await resUsers.json();
        const productsData = await resProducts.json();

        setUsers(usersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "admin" || !selectedUser || !selectedProduct) {
      setMessage("Completa todos los campos.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminId: user.id,
          userId: parseInt(selectedUser),
          productId: parseInt(selectedProduct),
        }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      console.error("Error asignando producto:", error);
      setMessage("Error al asignar producto.");
    }
  };

  // Bloqueos iguales al CreateProductPage
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
      <h2 className="text-2xl font-bold mb-6">Asignar producto a usuario</h2>

      <form onSubmit={handleAssign} className="space-y-4 max-w-md">
        {/* Dropdown de usuarios */}
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Selecciona un usuario</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>

        {/* Dropdown de productos */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Selecciona un producto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 rounded-lg hover:bg-green-700"
        >
          Asignar producto
        </button>

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </form>
    </div>
  );
}
