import Card from "./Card"
import { IAudiovisual } from "../types"
import styles from "../styles/CardList.module.css"

interface Props {
  audiovisuals: Array<IAudiovisual>
}

export default function CardList({ audiovisuals }: Props) {
  return (
    <section className={styles.list}>
      {audiovisuals && audiovisuals.length > 0 ? (
        audiovisuals.map((card) => <Card key={card.id} audiovisual={card} />)
      ) : (
        <h1>There are no movies or TV Shows to display</h1>
      )}
    </section>
  )
}
