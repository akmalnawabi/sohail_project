// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://afghanproducts.onrender.com";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  PROFILE: `${API_BASE_URL}/api/auth/profile`,

  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,
  UPLOAD: `${API_BASE_URL}/api/upload/single`,
};

export default API_BASE_URL;
