const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api"

export const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers || {})
  headers.set("Content-Type", "application/json")

  const token = localStorage.getItem("danceStudioToken")
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || "The request could not be completed")
  }

  return data
}

export { API_URL }
