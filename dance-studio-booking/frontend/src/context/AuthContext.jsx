import { createContext, useContext, useEffect, useState } from "react"
import { apiRequest } from "../lib/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const authenticate = (data) => {
    setUser(data.user)
  }

  useEffect(() => {
    apiRequest("/auth/me")
      .then(authenticate)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (credentials) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    authenticate(data)
  }

  const register = async (details) => {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(details),
    })
    authenticate(data)
  }

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" })
    } finally {
      setUser(null)
    }
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
