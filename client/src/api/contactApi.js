const API = import.meta.env.REACT_APP_API_URL;

export const sendContact = async (data) => {
  const res = await fetch(`${API}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed");
  }

  return result;
};