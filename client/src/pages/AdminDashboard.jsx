import { uploadMedia } from '../api/mediaApi';

export default function AdminDashboard() {
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await uploadMedia(formData);
    alert('Uploaded');
  };

  return (
    <form onSubmit={submit} className="p-10 space-y-4">
      <input name="file" type="file" />
      <input name="title" placeholder="Title" />
      <button className="bg-green-600 text-white px-4 py-2">
        Upload
      </button>
    </form>
  );
}
if (user?.role !== 'owner') {
      return <p>Access Denied</p>;
}