import express from "express"
import { pool } from "../db.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*,
        json_agg(
          json_build_object(
            'id', s.id,
            'sessionDate', s.session_date,
            'startTime', s.start_time,
            'endTime', s.end_time,
            'description', s.description
          )
          ORDER BY s.session_date ASC
        ) FILTER (WHERE s.id IS NOT NULL) AS availableClasses
      FROM classes c
      LEFT JOIN class_sessions s ON s.class_id = c.id
      GROUP BY c.id
      ORDER BY c.title ASC
    `)

    const formatted = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      image: row.image_url,
      paragraph1: row.paragraph1,
      paragraph2: row.paragraph2,
      paragraph3: row.paragraph3,
      availableClasses: row.availableclasses || [],
    }))

    return res.json(formatted)
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch classes", error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT c.*,
          json_agg(
            json_build_object(
              'id', s.id,
              'sessionDate', s.session_date,
              'startTime', s.start_time,
              'endTime', s.end_time,
              'description', s.description
            )
            ORDER BY s.session_date ASC
          ) FILTER (WHERE s.id IS NOT NULL) AS availableClasses
        FROM classes c
        LEFT JOIN class_sessions s ON s.class_id = c.id
        WHERE c.id = $1
        GROUP BY c.id
      `,
      [req.params.id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" })
    }

    const row = result.rows[0]
    return res.json({
      id: row.id,
      title: row.title,
      slug: row.slug,
      image: row.image_url,
      paragraph1: row.paragraph1,
      paragraph2: row.paragraph2,
      paragraph3: row.paragraph3,
      availableClasses: row.availableclasses || [],
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch class", error: error.message })
  }
})

router.post("/", protect, async (req, res) => {
  const { title, slug, image, paragraph1, paragraph2, paragraph3 } = req.body

  if (!title || !slug) {
    return res.status(400).json({ message: "Title and slug are required" })
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO classes (title, slug, image_url, paragraph1, paragraph2, paragraph3)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [
        title,
        slug,
        image || "",
        paragraph1 || "",
        paragraph2 || "",
        paragraph3 || "",
      ],
    )

    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create class", error: error.message })
  }
})

router.put("/:id", protect, async (req, res) => {
  const { title, slug, image, paragraph1, paragraph2, paragraph3 } = req.body

  try {
    const result = await pool.query(
      `
        UPDATE classes
        SET title = COALESCE($1, title),
            slug = COALESCE($2, slug),
            image_url = COALESCE($3, image_url),
            paragraph1 = COALESCE($4, paragraph1),
            paragraph2 = COALESCE($5, paragraph2),
            paragraph3 = COALESCE($6, paragraph3)
        WHERE id = $7
        RETURNING *
      `,
      [title, slug, image, paragraph1, paragraph2, paragraph3, req.params.id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" })
    }

    return res.json(result.rows[0])
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update class", error: error.message })
  }
})

router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM classes WHERE id = $1 RETURNING *",
      [req.params.id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" })
    }

    return res.json({ message: "Class deleted successfully" })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete class", error: error.message })
  }
})

export default router
