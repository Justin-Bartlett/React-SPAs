import dotenv from "dotenv"
import app from "./src/app.js"
import { pool } from "./src/db.js"

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await pool.query("SELECT 1")
    console.log("PostgreSQL connected successfully")

    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error.message)
    process.exit(1)
  }
}

startServer()
