import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import classRoutes from "./routes/classRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Dance Studio API is running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/sessions", sessionRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    message: "Something went wrong on the server",
    error: err.message,
  })
})

export default app
