import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { pool } from "../db.js"

dotenv.config()

const classes = [
  {
    title: "House",
    slug: "house",
    image_url: "/images/house.jpg",
    paragraph1:
      "House dance brings together rhythm, groove, and expressive movement.",
    paragraph2:
      "This class is ideal for dancers who want to build confidence and musicality.",
    paragraph3:
      "Expect a fun, energetic session with clean technique and dance-floor style.",
  },
  {
    title: "Beginner Choreo",
    slug: "beginner-choreo",
    image_url: "/images/beginner-choreo.jpg",
    paragraph1:
      "A welcoming introduction to choreography and performance basics.",
    paragraph2:
      "We break down movement patterns into easy-to-follow combinations.",
    paragraph3:
      "Perfect for beginners who want to move with confidence and style.",
  },
  {
    title: "Commercial",
    slug: "commercial",
    image_url: "/images/commercial.jpg",
    paragraph1:
      "Commercial dance focuses on style, confidence, and performance quality.",
    paragraph2:
      "This class incorporates upbeat choreography used in music videos and live shows.",
    paragraph3:
      "Ideal for dancers wanting to explore polished, contemporary commercial movement.",
  },
  {
    title: "Hip Hop",
    slug: "hip-hop",
    image_url: "/images/hip-hop.jpg",
    paragraph1:
      "Hip hop classes focus on rhythm, attitude, and foundational street styles.",
    paragraph2:
      "Students build confidence through combinations that emphasise groove and timing.",
    paragraph3:
      "Great for people looking for a high-energy class with attitude and personality.",
  },
]

const sessionData = {
  house: [
    {
      date: "2026-10-01",
      time: "18:30",
      end_time: "19:30",
      description: "Groove-focused house session with expressive footwork.",
    },
    {
      date: "2026-10-08",
      time: "18:30",
      end_time: "19:30",
      description: "Rhythm and musicality workshop",
    },
  ],
  "beginner-choreo": [
    {
      date: "2026-10-03",
      time: "10:00",
      end_time: "11:00",
      description: "Beginner-friendly choreography breakdown",
    },
    {
      date: "2026-10-10",
      time: "10:00",
      end_time: "11:00",
      description: "Confidence-building combinations and clean lines",
    },
  ],
  commercial: [
    {
      date: "2026-10-05",
      time: "17:30",
      end_time: "18:30",
      description: "Commercial style rehearsal with confident choreography",
    },
    {
      date: "2026-10-12",
      time: "17:30",
      end_time: "18:30",
      description: "Performance-focused class with styling detail",
    },
  ],
  "hip-hop": [
    {
      date: "2026-10-02",
      time: "19:00",
      end_time: "20:00",
      description: "Foundation hip hop class with rhythm and groove",
    },
    {
      date: "2026-10-09",
      time: "19:00",
      end_time: "20:00",
      description: "Dynamic street-inspired choreography with attitude",
    },
  ],
}

const seedData = async () => {
  const client = await pool.connect()

  try {
    const passwordHash = await bcrypt.hash("password123", 10)

    await client.query(
      `
      INSERT INTO users (email, password_hash, full_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
    `,
      ["admin@dance-studio.com", passwordHash, "Studio Admin"],
    )

    for (const classItem of classes) {
      const result = await client.query(
        `
          INSERT INTO classes (title, slug, image_url, paragraph1, paragraph2, paragraph3)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            image_url = EXCLUDED.image_url,
            paragraph1 = EXCLUDED.paragraph1,
            paragraph2 = EXCLUDED.paragraph2,
            paragraph3 = EXCLUDED.paragraph3
          RETURNING id
        `,
        [
          classItem.title,
          classItem.slug,
          classItem.image_url,
          classItem.paragraph1,
          classItem.paragraph2,
          classItem.paragraph3,
        ],
      )

      const classId = result.rows[0].id
      const sessions = sessionData[classItem.slug] || []

      await client.query("DELETE FROM class_sessions WHERE class_id = $1", [
        classId,
      ])

      for (const session of sessions) {
        await client.query(
          `
            INSERT INTO class_sessions (class_id, session_date, start_time, end_time, description)
            VALUES ($1, $2, $3, $4, $5)
          `,
          [
            classId,
            session.date,
            session.time,
            session.end_time,
            session.description,
          ],
        )
      }
    }

    console.log("Seed data inserted successfully")
  } finally {
    client.release()
  }
}

seedData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exit(1)
  })
