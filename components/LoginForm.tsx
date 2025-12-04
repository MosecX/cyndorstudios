"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
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
      <h2 className="text-3xl font-bold text-white text-center">Iniciar Sesión</h2>

      {/* Input usuario/correo */}
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-medium">
          Usuario o Correo
        </label>
        <input
          type="text"
          placeholder="ejemplo@correo.com"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
        {/* 🔑 Link olvidaste contraseña */}
        <p className="mt-2 text-right text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-[1.02] shadow-md"
      >
        Entrar
      </button>

      {/* Link registro */}
      <p className="text-center text-gray-400 text-sm">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Regístrate
        </a>
      </p>
    </form>
  );
}
