import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  // menu close on route change (optional but helpful)
  const closeMenu = () => setMenuOpen(false);

  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";

  const normal = `${base} bg-purple-600/90 text-white hover:bg-purple-700`;
  const active =
    `${base} bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg`;

  const links = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-xl 
                 bg-white/80 dark:bg-black/70 
                 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-3">
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group min-w-0">
          <div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full
                       bg-gradient-to-br from-purple-600 to-pink-500
                       flex items-center justify-center text-white text-xl
                       shadow-lg group-hover:scale-110 transition"
          >
            ✨
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
              Pragati Tent House
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Est. 2007</p>
          </div>
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:scale-110 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? active : normal)}
            >
              {l.label}
            </NavLink>
          ))}

          {!token ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? active : normal)}
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-full 
                         text-white text-sm hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE BUTTONS */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme small */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:scale-110 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-2 rounded-xl bg-gray-200/60 dark:bg-white/10 
                       text-gray-900 dark:text-white"
            aria-label="Open menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div
            className="rounded-2xl p-3 bg-white/90 dark:bg-black/70 
                       border border-gray-200 dark:border-gray-800
                       backdrop-blur-xl shadow-lg flex flex-col gap-2"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? active : normal
                }
              >
                {l.label}
              </NavLink>
            ))}

            {!token ? (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? active : normal)}
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="bg-red-600 px-4 py-2 rounded-full 
                           text-white text-sm hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;