import { useParams } from "react-router-dom"

import ClassesList from "../components/ClassesList"
import { DUMMY_CLASSES } from "../dummy data/dummy_data"
import classes from "./HomePage.module.css"

const normalizeClassKey = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "")

const getClassMatchKeys = (value = "") => {
  const normalized = normalizeClassKey(value)
  return [normalized, normalized.replace(/^beginners/, "beginner")]
}

const HomePage = () => {
  const params = useParams()
  const normalizedClassUrlId = normalizeClassKey(params.classId)
  const formattedClassUrlId = params.classId.replace(/-/g, " ").toLowerCase()
  const thisClass = DUMMY_CLASSES.find((item) =>
    getClassMatchKeys(item.title).includes(normalizedClassUrlId),
  )

  return (
    <>
      <section className={classes.heading}>
        <h1>{formattedClassUrlId}</h1>
        <h2>Available classes</h2>
        <p>{thisClass?.paragraph1}</p>
        <p>{thisClass?.paragraph2}</p>
        <p>{thisClass?.paragraph3}</p>
      </section>

      <ClassesList classes={DUMMY_CLASSES} classUrlId={params.classId} />
    </>
  )
}

export default HomePage
