import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { uploadMedia } from "../api/mediaApi";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🔐 Protect Route
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login");   // not logged in
      }
    };

    checkUser();
  }, [navigate]);

  // 📤 Upload Handler
  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.target);
      await uploadMedia(formData);

      alert("Uploaded Successfully ✅");
      e.target.reset();

    } catch (error) {
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <form onSubmit={submit} className="space-y-4 max-w-md">

        <input
          name="file"
          type="file"
          required
          className="block w-full p-2 bg-gray-800 rounded"
        />

        <input
          name="title"
          placeholder="Title"
          required
          className="block w-full p-2 bg-gray-800 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </form>

    </div>
  );
}