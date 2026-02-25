import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-200 transition-colors duration-300">
      <Navbar />
           <AuthProvider>
      {/* Router + Routes */}
    </AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;