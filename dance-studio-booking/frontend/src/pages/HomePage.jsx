import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ClassesList from "../components/ClassesList"
import { apiRequest } from "../lib/api"
import { classImages } from "../lib/classImages"
import classes from "./HomePage.module.css"

const normalizeClassKey = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "")

const getClassMatchKeys = (value = "") => {
  const normalized = normalizeClassKey(value)
  return [normalized, normalized.replace(/^beginners/, "beginner")]
}

const HomePage = () => {
  const params = useParams()
  const [classData, setClassData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    apiRequest("/classes")
      .then((data) =>
        setClassData(
          data.map((item) => ({
            ...item,
            image: classImages[item.slug] || item.image,
          })),
        ),
      )
      .catch((requestError) => setError(requestError.message))
  }, [])

  const normalizedClassUrlId = normalizeClassKey(params.classId)
  const formattedClassUrlId = params.classId
    ? params.classId.replace(/-/g, " ").toLowerCase()
    : "dance classes"
  const thisClass = classData.find((item) =>
    getClassMatchKeys(item.title).includes(normalizedClassUrlId),
  )

  return (
    <>
      <section className={classes.heading}>
        <h1>{formattedClassUrlId}</h1>
        <h2>Available classes</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <p>{thisClass?.paragraph1}</p>
            <p>{thisClass?.paragraph2}</p>
            <p>{thisClass?.paragraph3}</p>
          </>
        )}
      </section>

      <ClassesList classes={classData} classUrlId={params.classId} />
    </>
  )
}

export default HomePage
