import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { pool } from "../db.js"

const router = express.Router()

const createToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, fullName: user.full_name },
    process.env.JWT_SECRET || "super-secret-jwt-key-change-this",
    { expiresIn: "7d" },
  )

router.post("/register", async (req, res) => {
  const { email, password, fullName } = req.body

  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({ message: "Email, password, and full name are required" })
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
    const token = createToken(user)

    return res
      .status(201)
      .json({
        token,
        user: { id: user.id, email: user.email, fullName: user.full_name },
      })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

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

    const token = createToken(user)

    return res.json({
      token,
      user: { id: user.id, email: user.email, fullName: user.full_name },
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message })
  }
})

export default router
