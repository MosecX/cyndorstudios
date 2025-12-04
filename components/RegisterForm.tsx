"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mt-12 p-8 bg-neutral-900 rounded-2xl shadow-xl border border-gray-700"
    >
      <h2 className="text-3xl font-bold text-white text-center">Registrar Cuenta</h2>

      {/* Input usuario */}
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-medium">
          Usuario
        </label>
        <input
          type="text"
          placeholder="Tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Input correo */}
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-medium">
          Correo
        </label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Input contraseña */}
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-medium">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-[1.02] shadow-md"
      >
        Registrarse
      </button>

      {/* Texto para iniciar sesión */}
      <p className="text-center text-gray-400 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}
