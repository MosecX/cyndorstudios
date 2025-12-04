"use client";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    fetch("/api/validate-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(async (res) => {
      if (res.ok) setValid(true);
      else setMessage("Token inválido o expirado.");
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    const token = new URLSearchParams(window.location.search).get("token");
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Contraseña actualizada con éxito. Redirigiendo...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } else {
      setMessage(data.error || "Error al actualizar la contraseña.");
    }
  };

  // 🔴 Caso token inválido o expirado
  if (!valid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950">
        <p className="text-red-500 text-center mt-6">
          Este enlace ha expirado. Volvé a solicitar recuperación.
        </p>
        <a
          href="/forgot-password"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Solicitar nuevo enlace
        </a>
      </div>
    );
  }

  // 🟢 Caso token válido → mostrar formulario
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Restablecer contraseña
        </h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Guardar nueva contraseña
        </button>
        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </form>
    </div>
  );
}
