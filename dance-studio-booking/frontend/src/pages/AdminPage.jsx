import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { apiRequest } from "../lib/api"
import styles from "./AdminPage.module.css"

const initialForm = {
  classId: "",
  sessionDate: "",
  startTime: "",
  endTime: "",
  description: "",
}

const formatSessionDate = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value.includes("T") ? value : `${value}T12:00:00`))

const AdminPage = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth()
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [sessions, setSessions] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadAdminData = async () => {
    const [classData, sessionData] = await Promise.all([
      apiRequest("/classes"),
      apiRequest("/sessions"),
    ])
    setClasses(classData)
    setSessions(sessionData)
    setForm((current) => ({
      ...current,
      classId: current.classId || String(classData[0]?.id || ""),
    }))
  }

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: "/admin" } })
      return
    }

    loadAdminData().catch((requestError) => setError(requestError.message))
  }, [isAuthenticated, isLoading, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setStatus("")
    setIsSubmitting(true)

    try {
      await apiRequest("/sessions", {
        method: "POST",
        body: JSON.stringify(form),
      })
      await loadAdminData()
      setForm((current) => ({ ...initialForm, classId: current.classId }))
      setStatus("The dance session was created and added to the database.")
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (isLoading || !isAuthenticated) return null

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <h1>Studio admin</h1>
        <p>Signed in as {user?.email}</p>

        <h2>Create a dance session</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            Class
            <select
              value={form.classId}
              onChange={(event) =>
                setForm({ ...form, classId: event.target.value })
              }
              required
            >
              <option value="">Choose a class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.title}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            Date
            <input
              type="date"
              value={form.sessionDate}
              onChange={(event) =>
                setForm({ ...form, sessionDate: event.target.value })
              }
              required
            />
          </label>
          <label className={styles.field}>
            Start time
            <input
              type="time"
              value={form.startTime}
              onChange={(event) =>
                setForm({ ...form, startTime: event.target.value })
              }
              required
            />
          </label>
          <label className={styles.field}>
            End time
            <input
              type="time"
              value={form.endTime}
              onChange={(event) =>
                setForm({ ...form, endTime: event.target.value })
              }
            />
          </label>
          <label className={`${styles.field} ${styles.fieldWide}`}>
            Description
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              placeholder="What will this session focus on?"
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating session..." : "Create session"}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
        {status && <p className={styles.status}>{status}</p>}

        <h2>Upcoming sessions</h2>
        <ul className={styles.sessions}>
          {sessions.map((session) => (
            <li className={styles.session} key={session.id}>
              <div>
                <strong>{session.class_title}</strong>
                <p>{formatSessionDate(session.session_date)}</p>
                <p>
                  {session.start_time.slice(0, 5)}
                  {session.end_time ? ` - ${session.end_time.slice(0, 5)}` : ""}
                </p>
              </div>
              <span>{session.description}</span>
            </li>
          ))}
        </ul>

        <button type="button" onClick={handleLogout}>
          Sign out
        </button>
      </section>
    </main>
  )
}

export default AdminPage
