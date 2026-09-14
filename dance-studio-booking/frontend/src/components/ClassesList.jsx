import { Link } from "react-router-dom"

import styles from "./ClassesList.module.css"

const formatClassDate = (dateString) => {
  const date = new Date(
    dateString.includes("T") ? dateString : `${dateString}T12:00:00`,
  )
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(
    date,
  )
  const day = date.getDate()
  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th"
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date)
  const year = date.getFullYear()

  return `${weekday} ${day}${ordinal} ${month} ${year}.`
}

const normalizeClassKey = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "")

const getClassMatchKeys = (value = "") => {
  const normalized = normalizeClassKey(value)
  return [normalized, normalized.replace(/^beginners/, "beginner")]
}

const ClassesList = ({ classes: classData, classUrlId }) => {
  const normalizedClassUrlId = normalizeClassKey(classUrlId)
  const thisClass = classUrlId
    ? classData.filter((item) =>
        getClassMatchKeys(item.title).includes(normalizedClassUrlId),
      )
    : []

  return (
    <ul className={styles.classList}>
      {thisClass.flatMap((item) =>
        (item.availableClasses || []).map((session) => (
          <li
            className={styles.classItem}
            key={`${item.id}-${session.id ?? session.sessionDate}-${session.startTime}`}
          >
            <div className={styles.topdetailnav}>
              <nav>
                <ul>
                  <li>
                    <Link to="/">{formatClassDate(session.sessionDate)}</Link>
                  </li>
                  <li>
                    <Link to="/">{session.startTime?.slice(0, 5)}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles.classContent}>
              <img src={item.image} alt={item.title} />
              <div className={styles.classDetails}>
                <p>{session.description}</p>
                <button>Book</button>
              </div>
            </div>
          </li>
        )),
      )}
    </ul>
  )
}

export default ClassesList
