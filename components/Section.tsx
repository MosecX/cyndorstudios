// components/Section.tsx
export default function Section() {
  return (
    <div className="grid grid-cols-5 grid-rows-12 gap-3 lg:grid">
      {/* Laterales y esquinas solo en desktop */}
      <div className="row-span-10 col-start-1 row-start-2 bg-neutral-900 rounded-lg p-4 hidden lg:block">
        <h3 className="text-blue-400 font-bold mb-2">Menú</h3>
        <ul className="space-y-2 text-gray-300">
          <li>Dashboard</li>
          <li>Productos</li>
          <li>Licencias</li>
          <li>Usuarios</li>
          <li>Estadísticas</li>
        </ul>
      </div>

      <div className="row-span-10 col-start-5 row-start-2 bg-neutral-900 rounded-lg p-4 hidden lg:block">
        <h3 className="text-blue-400 font-bold mb-2">Notificaciones</h3>
        <ul className="mt-2 space-y-1 text-gray-400 text-sm">
          <li>✔ Licencia asignada a Juan</li>
          <li>✔ Producto agregado: Premium Bot</li>
          <li>⚠ Usuario sin correo verificado</li>
        </ul>
      </div>

      <div className="col-start-1 row-start-1 bg-neutral-900 rounded-lg p-2 text-center text-gray-400 hidden lg:block">
        Logo
      </div>
      <div className="col-start-5 row-start-1 bg-neutral-900 rounded-lg p-2 text-center text-gray-400 hidden lg:block">
        Perfil
      </div>

      {/* Contenido central */}
      <div className="col-span-5 lg:col-span-3 col-start-1 lg:col-start-2 row-start-1 bg-neutral-900 rounded-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Panel Admin</h1>
        <span className="text-gray-400 text-sm">Versión 1.0.0</span>
      </div>

      <div className="col-span-5 lg:col-span-3 row-span-3 col-start-1 lg:col-start-2 row-start-2 bg-neutral-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-400">Estadísticas rápidas</h2>
        <p className="text-gray-300 mt-2">Usuarios activos: <span className="text-green-400">124</span></p>
        <p className="text-gray-300">Productos asignados: <span className="text-green-400">58</span></p>
        <p className="text-gray-300">Licencias vigentes: <span className="text-green-400">32</span></p>
      </div>

      <div className="col-span-5 lg:col-span-3 col-start-1 lg:col-start-2 row-start-5 bg-neutral-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-400">Productos destacados</h2>
        <ul className="mt-3 space-y-2 text-gray-300">
          <li>🎧 Audio Premium</li>
          <li>🤖 Bot Privado</li>
          <li>📊 Dashboard Pro</li>
        </ul>
      </div>

      {/* Bloque 15 */}
      <div className="col-span-5 lg:col-span-3 col-start-1 lg:col-start-2 row-start-8 bg-neutral-800 rounded-lg p-4">
        <h3 className="text-blue-400 font-bold">Bloque 15</h3>
        <p className="text-gray-300 text-sm">Contenido relacionado con licencias activas y productos premium.</p>
      </div>

      {/* Bloques 11, 13, 14 → responsive en una sola línea */}
      <div className="col-span-5 lg:col-span-3 col-start-1 lg:col-start-2 row-start-9 flex flex-col lg:grid lg:grid-cols-3 gap-3">
        <div className="bg-neutral-800 rounded-lg p-4">Bloque 11</div>
        <div className="bg-neutral-800 rounded-lg p-4">Bloque 13</div>
        <div className="bg-neutral-800 rounded-lg p-4">Bloque 14</div>
      </div>

      {/* Bloque 17 */}
      <div className="col-span-5 lg:col-span-3 col-start-1 lg:col-start-2 row-start-11 bg-neutral-800 rounded-lg p-4">
        <h3 className="text-blue-400 font-bold">Bloque 17</h3>
        <p className="text-gray-300 text-sm">Resumen final del panel con métricas y accesos rápidos.</p>
      </div>
    </div>
  );
}
