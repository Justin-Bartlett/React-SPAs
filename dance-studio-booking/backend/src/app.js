import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { rateLimit } from "express-rate-limit"

import authRoutes from "./routes/authRoutes.js"
import classRoutes from "./routes/classRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express()
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many authentication attempts" },
})

app.disable("x-powered-by")
app.use(helmet())
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
)
app.use(express.json({ limit: "10kb" }))
app.use(cookieParser())

app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next()
  }

  const requestOrigin = req.get("origin")
  if (requestOrigin !== frontendUrl) {
    return res.status(403).json({ message: "Request origin is not allowed" })
  }

  return next()
})

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Dance Studio API is running" })
})

app.use("/api/auth/login", authRateLimit)
app.use("/api/auth/register", authRateLimit)
app.use("/api/auth", authRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/sessions", sessionRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    message: "Something went wrong on the server",
  })
})

export default app
