// components/Footer.tsx
export default function Footer() {
  return (
    <footer
      className="bg-neutral-900 rounded-lg shadow border border-gray-700 m-4"
      aria-label="Footer"
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        
        {/* Texto copyright */}
        <span className="text-sm text-gray-400 sm:text-center">
          &copy; 2025{" "}
          <a href="/" className="hover:underline font-semibold text-white">
            Cyndor Studios
          </a>. Todos los derechos reservados.
        </span>
        
        {/* Links */}
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
          <li>
            <a href="/about" className="hover:underline mr-4 md:mr-6">About</a>
          </li>
          <li>
            <a href="/privacy" className="hover:underline mr-4 md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="/licensing" className="hover:underline mr-4 md:mr-6">Licensing</a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
