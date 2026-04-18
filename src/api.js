const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};
  try {
    data = await response.json();
  } catch (_error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const api = {
  getProducts: (params = {}) => {
    const searchParams = new URLSearchParams();

    if (params.category && params.category !== "all") {
      searchParams.set("category", params.category);
    }

    if (params.sort) {
      searchParams.set("sort", params.sort);
    }

    const query = searchParams.toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: (token) =>
    request("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createCheckoutSession: (token, items, options = {}) =>
    request("/checkout/create-session", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items, ...options }),
    }),
  createPaymentOrder: (token, payload) =>
    request("/payment/order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  verifyPayment: (token, payload) =>
    request("/payment/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  submitCorporateInquiry: (payload) =>
    request("/inquiries/corporate", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  addProduct: (token, payload) =>
    request("/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }),
  uploadProductImage: (token, file) => {
    const body = new FormData();
    body.append("image", file);
    return request("/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
  },
  deleteProduct: (token, id) =>
    request(`/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  makeSuperUser: (token, email) =>
    request("/auth/make-super-user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    }),
};
