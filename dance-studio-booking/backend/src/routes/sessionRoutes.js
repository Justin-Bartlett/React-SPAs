import express from "express"
import { pool } from "../db.js"
import { protect, requireAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT s.*, c.title AS class_title, c.slug AS class_slug
        FROM class_sessions s
        JOIN classes c ON c.id = s.class_id
        ORDER BY s.session_date ASC
      `,
    )

    return res.json(result.rows)
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch sessions" })
  }
})

router.post("/", protect, requireAdmin, async (req, res) => {
  const { classId, sessionDate, startTime, endTime, description } = req.body

  if (!classId || !sessionDate || !startTime) {
    return res
      .status(400)
      .json({ message: "classId, sessionDate, and startTime are required" })
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO class_sessions (class_id, session_date, start_time, end_time, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [classId, sessionDate, startTime, endTime || null, description || ""],
    )

    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ message: "Failed to create session" })
  }
})

router.put("/:id", protect, requireAdmin, async (req, res) => {
  const { classId, sessionDate, startTime, endTime, description } = req.body

  try {
    const result = await pool.query(
      `
        UPDATE class_sessions
        SET class_id = COALESCE($1, class_id),
            session_date = COALESCE($2, session_date),
            start_time = COALESCE($3, start_time),
            end_time = COALESCE($4, end_time),
            description = COALESCE($5, description)
        WHERE id = $6
        RETURNING *
      `,
      [classId, sessionDate, startTime, endTime, description, req.params.id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Session not found" })
    }

    return res.json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ message: "Failed to update session" })
  }
})

router.delete("/:id", protect, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM class_sessions WHERE id = $1 RETURNING *",
      [req.params.id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Session not found" })
    }

    return res.json({ message: "Session deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete session" })
  }
})

export default router
