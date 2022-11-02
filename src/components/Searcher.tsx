import { FormEvent, useState } from "react"
import { useRouter } from "next/router"

import styles from "../styles/Searcher.module.css"

export default function Searcher() {
  const router = useRouter()
  const { title } = router.query

  const [titleValue, setTitleValue] = useState<string>(title as string)

  const pushTitleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(
      {
        pathname: "/buscar",
        query: `title=${
          (e.currentTarget.elements[0] as HTMLInputElement).value
        }`
      },
      "/buscar"
    )
  }

  return (
    <>
      <form onSubmit={(e) => pushTitleSearch(e)} className={styles.searcher}>
        <input
          autoFocus
          defaultValue={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          name="title"
          type="text"
          placeholder="Busca películas o series"
        />
        <button>Buscar</button>
      </form>
    </>
  )
}
