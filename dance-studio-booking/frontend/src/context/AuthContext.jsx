import { createContext, useContext, useMemo, useState } from "react"
import { apiRequest } from "../lib/api"

const AuthContext = createContext(null)

const storedUser = localStorage.getItem("danceStudioUser")

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null)
  const [token, setToken] = useState(localStorage.getItem("danceStudioToken"))

  const authenticate = (data) => {
    localStorage.setItem("danceStudioToken", data.token)
    localStorage.setItem("danceStudioUser", JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
  }

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

  const logout = () => {
    localStorage.removeItem("danceStudioToken")
    localStorage.removeItem("danceStudioUser")
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
