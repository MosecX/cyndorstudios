"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/me", { credentials: "include" });
      const data = await res.json();
      setUser(data.user);
    };
    checkUser();
  }, []);

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setDropdownOpen(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-neutral-900 fixed w-full z-20 top-0 start-0 border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              className="h-14 w-14 rounded-lg object-cover"
              alt="Cyndor Studios Logo"
            />
            <span className="text-xl font-semibold text-white truncate">
              Cyndor Studios
            </span>
          </a>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center space-x-8 font-medium">
            <li><a href="/" className="text-blue-500 hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">About</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">Services</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">Contact</a></li>
          </ul>

          {/* Usuario + hamburguesa */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="text-white font-medium px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {user.username}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-neutral-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    {/* ✅ Account arriba de Dashboard */}
                    <a
                      href="/account"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Account
                    </a>

                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Dashboard
                    </a>

                    {user.role === "admin" && (
                      <a
                        href="/dashboard/admin"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Panel Admin
                      </a>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 border border-transparent focus:ring-4 focus:ring-blue-400 shadow font-medium rounded-lg text-sm px-3 py-2 focus:outline-none"
              >
                Login
              </a>
            )}

            {/* Hamburguesa móvil */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 w-10 h-10 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
              aria-controls="navbar-links"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Links móvil */}
        <div
          id="navbar-links"
          className={`md:hidden mt-4 ${isOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col font-medium border border-gray-700 rounded-lg bg-neutral-800">
            <li><a href="/" className="block py-2 px-3 text-white bg-blue-600 rounded">Home</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white">About</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white">Services</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
