import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    darkMode
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  }, [darkMode]);

  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";

  const normal =
    `${base} bg-purple-600/90 text-white hover:bg-purple-700`;

  const active =
    `${base} bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg`;

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl 
                    bg-white/80 dark:bg-black/70 
                    border-b border-gray-200 dark:border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 group">

          <div className="w-12 h-12 rounded-full
                          bg-gradient-to-br from-purple-600 to-pink-500
                          flex items-center justify-center text-white text-xl
                          shadow-lg group-hover:scale-110 transition">
            ✨
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Pragati Tent House
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Est. 2007
            </p>
          </div>

        </NavLink>


        {/* MENU */}
        <div className="flex gap-4 items-center">

          {/* Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:scale-110 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {["/", "/gallery", "/services", "/contact"].map((path, i) => {
            const names = ["Home", "Gallery", "Services", "Contact"];

            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive ? active : normal
                }
              >
                {names[i]}
              </NavLink>
            );
          })}


          {!token ? (

            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? active : normal
              }
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

      </div>
    </nav>
  );
};

export default Navbar;