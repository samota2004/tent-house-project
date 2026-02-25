import { useState } from "react";
import api from "../api/axios";   // ⚠️ yaha change kiya

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const formData = Object.fromEntries(new FormData(e.target));

    if (!formData.name || !formData.phone || !formData.message?.trim()) {
      setStatus({
        type: "error",
        text: "Please fill all required fields",
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Direct API call
      const res = await api.post("/contact", formData);

      if (res.data.success) {
        setStatus({
          type: "success",
          text: "Message sent successfully!",
        });
        e.target.reset();
      }

    } catch (err) {
      console.log("CONTACT ERROR:", err.response?.data);
      setStatus({
        type: "error",
        text: "Failed to send message. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Get In <span className="text-purple-500">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          हम आपके सपनों के इवेंट को हकीकत बनाने के लिए तैयार हैं।
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE INFO */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 
                        backdrop-blur-xl border border-purple-500/30 shadow-xl">

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Pragati Tent House
          </h3>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 text-xl">
                📞
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  +91 9982478440
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-500 text-xl">
                📧
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  tarachandsamota66@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 text-xl">
                📍
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  Netarwas, Dhod Road, Sikar(Raj)
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 
                        border border-gray-200 dark:border-gray-700 shadow-xl">

          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Plan Your Perfect Event
          </h3>

          <form onSubmit={submit} className="space-y-5">

            <input
              name="name"
              placeholder="Full Name"
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-black 
                         border border-gray-300 dark:border-gray-700
                         focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-black 
                         border border-gray-300 dark:border-gray-700
                         focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <textarea
              name="message"
              placeholder="Tell us about your event..."
              rows="5"
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-black 
                         border border-gray-300 dark:border-gray-700
                         focus:ring-2 focus:ring-purple-500 outline-none"
            />

            {status && (
              <p
                className={`text-sm text-center ${
                  status.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {status.text}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-medium
                         bg-gradient-to-r from-purple-600 to-pink-500
                         hover:scale-105 transition-transform duration-300
                         shadow-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry ✨"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}