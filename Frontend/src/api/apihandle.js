const BASE = "http://localhost:5000/api/v1";

const getToken = () => localStorage.getItem("authToken");

async function request(path, options = {}) {
  const headers = options.headers || {};
  if (getToken()) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }
  headers["Content-Type"] = "application/json";

  const res = await fetch(BASE + path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json().catch(() => ({}));
}

export default {
  login: async ({ email, password }) => {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  signup: async (payload) => {
    return request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  checkAuth: async () => {
    return request("/auth/check-auth", { method: "GET" });
  },
};
