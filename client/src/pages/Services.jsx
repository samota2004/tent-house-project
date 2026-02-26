import { useState } from "react";

export default function Services() {

  const [showBooking, setShowBooking] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    phone: "",
    email: "",
    guests: "",
    details: "",
  });

  const services = [
    { title: "Pragati Wedding Tent", desc: "Premium wedding tents with royal theme decoration", icon: "🏰" },
    { title: "Wedding Decoration", desc: "Luxury stage, floral setup & theme decoration", icon: "👑" },
    { title: "Catering Services", desc: "Complete catering setup with buffet & staff", icon: "🍽️" },
    { title: "Party & Events", desc: "Birthday & private party decoration", icon: "🎉" },
    { title: "Corporate Events", desc: "Professional meetings & conferences", icon: "🏢" },
    { title: "Lighting & Sound", desc: "DJ lights & sound systems", icon: "🎵" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowBooking(false);
    setSuccess("");
    setError("");
    setFormData({
      date: "",
      name: "",
      phone: "",
      email: "",
      guests: "",
      details: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.date || !formData.name || !formData.phone) {
      setError("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://tent-house-backend.onrender.com/api/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service: serviceName, ...formData }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSuccess("✅ Booking submitted successfully!");
      } else {
        setError("❌ Booking failed. Try again.");
      }
    } catch (err) {
      setError("❌ Server error. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50 dark:bg-[#0a0a0a]">

      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Our <span className="text-purple-600">Premium Services</span>
        </h1>
        <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></div>
      </div> 
      {/* SERVICES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {services.map((s, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">

            <div className="text-5xl mb-4">{s.icon}</div>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              {s.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              {s.desc}
            </p>

            <button
              onClick={() => {
                setShowBooking(true);
                setServiceName(s.title);
                                  setSuccess("");
                  setError("");
              }}
              className="w-full py-3 rounded-full text-white 
              bg-gradient-to-r from-purple-600 to-pink-500"
            >
              Book Now
            </button>

          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-900 rounded-3xl 
          p-8 w-full max-w-md relative shadow-2xl">

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-9 h-9 
              rounded-full bg-red-500 text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-purple-600 mb-1 text-center">
              Book Service
            </h2>

            <p className="text-center text-sm text-gray-500 mb-6">
              {serviceName}
            </p>

            {success && (
              <p className="text-green-500 text-center mb-4">
                {success}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-center mb-4">
                {error}
              </p>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* DATE FIXED INPUT */}
               <div className="relative w-full">
  <input
  type="text"
  name="date"
  placeholder="Select Event Date"
  value={formData.date}
  onFocus={(e) => (e.target.type = "date")}
  onBlur={(e) => {
    if (!e.target.value) e.target.type = "text";
  }}
  onChange={handleChange}
  required
  className="w-full p-3 rounded border 
  bg-white dark:bg-black 
  text-black dark:text-white"
/>

  {/* Custom Calendar Icon */}
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl 
text-gray-700 dark:text-white pointer-events-none">
    📅
  </span>
</div>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded border 
                  bg-white dark:bg-black 
                  dark:text-white"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded border 
                  bg-white dark:bg-black 
                  dark:text-white"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded border 
                  bg-white dark:bg-black 
                  dark:text-white"
                />

                <input
                  type="number"
                  name="guests"
                  placeholder="Expected Guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full p-3 rounded border 
                  bg-white dark:bg-black 
                  dark:text-white"
                />

                <textarea
                  name="details"
                  placeholder="Event Details"
                  rows="3"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full p-3 rounded border 
                  bg-white dark:bg-black 
                  dark:text-white"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full text-white 
                  bg-gradient-to-r from-purple-600 to-pink-500"
                >
                  {loading ? "Sending..." : "Confirm Booking"}
                </button>

              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}