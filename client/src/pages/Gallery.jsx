import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import UploadModal from "../components/UploadModal";
import { FaTrash } from "react-icons/fa";

export default function Gallery() {
  const [media, setMedia] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const { role } = useAuth();

  // 🔹 Fetch all media
  const fetchMedia = async () => {
    try {
      const res = await api.get("/media");
      setMedia(res.data);
    } catch (err) {
      console.error("Fetch media error:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // 🔥 DELETE USING MongoDB _id
const deleteMedia = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User not authenticated");
    return;
  }

  try {
    const res = await fetch(`https://tent-house-backend.onrender.com/api/media/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Delete response:", data);

    if (!res.ok) {
      alert(data.message || "Delete failed");
      return;
    }

    // UI se turant remove
    setMedia((prev) => prev.filter((item) => item._id !== id));
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-400">
        Gallery
      </h1>

      {/* OWNER UPLOAD BUTTON */}
      {role === "owner" && (
        <div className="text-center mb-10">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full"
          >
            Upload Photo / Video
          </button>
        </div>
      )}

      {/* GALLERY GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {media.map((item) => (
          <div
            key={item._id} // ✅ MongoDB _id
            className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-900"
          >
            {/* IMAGE / VIDEO */}
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.title || "gallery image"}
                className="w-full h-64 object-cover"
              />
            ) : (
              <video
                src={item.url}
                controls
                className="w-full h-64 object-cover"
              />
            )}

            {/* 🗑 DELETE ICON */}
            {role === "owner" && (
              <button
                onClick={() => deleteMedia(item._id)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg"
                title="Delete"
              >
                <FaTrash size={16} />
              </button>
            )}

            {/* TITLE + CATEGORY */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-purple-400">
                {item.title || "Tent Decoration"}
              </h3>
              <p className="text-sm text-gray-400 capitalize">
                {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={fetchMedia}
        />
      )}
    </div>
  );
}