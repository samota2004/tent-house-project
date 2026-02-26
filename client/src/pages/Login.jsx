import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const userData = {
        token: res.data.token,
        role: res.data.role,
      };

      login(userData);

      alert("Login successful");
      navigate("/gallery", { replace: true });
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen pt-32 flex justify-center items-start bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 px-6">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500">

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl">

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Owner <span className="text-purple-600">Login</span>
            </h2>

            <form onSubmit={submitHandler} className="space-y-6">

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-black
                             border border-gray-300 dark:border-gray-700
                             focus:ring-2 focus:ring-purple-500
                             outline-none transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-black
                             border border-gray-300 dark:border-gray-700
                             focus:ring-2 focus:ring-purple-500
                             outline-none transition"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full text-white font-semibold
                           bg-gradient-to-r from-purple-600 to-pink-500
                           hover:scale-105 transition-transform duration-300
                           shadow-lg"
              >
                Login 🚀
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;