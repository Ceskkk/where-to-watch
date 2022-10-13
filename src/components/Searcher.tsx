import styles from "../styles/Searcher.module.css"

export default function Searcher() {
  return (
    <>
      <input
        className={styles.searcher}
        type="text"
        placeholder="Search for movies or TV series"
      />
    </>
  )
}
