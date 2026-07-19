const configuredUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

// In production set VITE_API_URL to the Railway API URL, including /api.
export const API_URL = configuredUrl || '/api'
