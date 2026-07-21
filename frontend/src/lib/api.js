const configuredUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export const API_URL = configuredUrl || "http://localhost:8000";
