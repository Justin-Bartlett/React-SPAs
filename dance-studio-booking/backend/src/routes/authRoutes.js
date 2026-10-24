import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { pool } from "../db.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()
const authCookieName = "danceStudioToken"
const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.COOKIE_SAME_SITE || "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
}

const clearAuthCookieOptions = { ...authCookieOptions, maxAge: undefined }

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured")
  }

  return process.env.JWT_SECRET
}

const createToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn: "7d" },
  )

const setAuthCookie = (res, user) => {
  res.cookie(authCookieName, createToken(user), authCookieOptions)
}

const publicUser = (user) => ({
  id: user.id,
  email: user.email,
  fullName: user.full_name,
  role: user.role,
})

router.get("/me", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, full_name, role FROM users WHERE id = $1",
      [req.user.id],
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User account not found" })
    }

    return res.json({ user: publicUser(result.rows[0]) })
  } catch (error) {
    return res.status(500).json({ message: "Failed to restore session" })
  }
})

router.post("/register", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase()
  const password = req.body.password
  const fullName = req.body.fullName?.trim()

  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({ message: "Email, password, and full name are required" })
  }

  if (password.length < 12) {
    return res
      .status(400)
      .json({ message: "Password must be at least 12 characters" })
  }

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    )
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name",
      [email, passwordHash, fullName],
    )

    const user = result.rows[0]
    setAuthCookie(res, user)

    return res.status(201).json({ user: publicUser(user) })
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" })
  }
})

router.post("/login", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase()
  const password = req.body.password

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    setAuthCookie(res, user)

    return res.json({ user: publicUser(user) })
  } catch (error) {
    return res.status(500).json({ message: "Login failed" })
  }
})

router.post("/logout", (req, res) => {
  res.clearCookie(authCookieName, clearAuthCookieOptions)
  return res.status(204).send()
})

export default router
