import { useRouter } from "next/router"
import { ChangeEvent } from "react"

import styles from "../styles/Searcher.module.css"

export default function Searcher() {
  const router = useRouter()
  const { title } = router.query

  const pushTitleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    router.push(`/search/?title=${e.target.value}`)
  }

  return (
    <>
      <input
        autoFocus
        onChange={(e) => pushTitleSearch(e)}
        value={title}
        name="title"
        type="text"
        placeholder="Search for movies or TV series"
        className={styles.searcher}
      />
    </>
  )
}
