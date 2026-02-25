import { useState } from "react";
import api from "../api/axios";

export default function UploadModal({ onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("other");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select image or video");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
      setLoading(true);
      await api.post("/media/upload", formData);
      onUpload();   // gallery refresh
      onClose();    // modal close
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">
          Upload Media
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 bg-black border border-gray-700 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full p-3 bg-black border border-gray-700 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="wedding">Wedding</option>
            <option value="party">Party</option>
            <option value="corporate">Corporate</option>
            <option value="other">Other</option>
          </select>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 py-2 rounded"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}