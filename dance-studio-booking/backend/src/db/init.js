import dotenv from "dotenv"
import { pool } from "../db.js"

dotenv.config()

const createTables = async () => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'user'
    `)

    await client
      .query(
        `
      ALTER TABLE users
      ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'))
    `,
      )
      .catch((error) => {
        if (error.code !== "42710") throw error
      })

    await client.query(`
      CREATE TABLE IF NOT EXISTS classes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        image_url TEXT,
        paragraph1 TEXT,
        paragraph2 TEXT,
        paragraph3 TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS class_sessions (
        id SERIAL PRIMARY KEY,
        class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
        session_date TIMESTAMPTZ NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query("COMMIT")
    console.log("Database tables created successfully")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

createTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to initialise database:", error)
    process.exit(1)
  })
