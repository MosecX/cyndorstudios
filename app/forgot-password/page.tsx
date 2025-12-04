"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || data.error || "Error al procesar la solicitud.");
    } catch (error) {
      console.error("Error en forgot-password:", error);
      setMessage("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Recuperar contraseña
        </h2>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Enviar enlace
        </button>
        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </form>
    </div>
  );
}
