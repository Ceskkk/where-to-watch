import Card from "./Card"
import { isMovie } from "../types/guards"
import { IMovie, ISerie } from "../types"
import styles from "../styles/CardList.module.css"

export default function CardList({
  audiovisuals
}: {
  audiovisuals: (IMovie | ISerie)[]
}) {
  return (
    <section className={styles.list}>
      {audiovisuals &&
        audiovisuals.length > 0 &&
        audiovisuals.map((audiovisual) => (
          <Card
            key={
              isMovie(audiovisual)
                ? `película-${audiovisual.id}`
                : `serie-${audiovisual.id}`
            }
            audiovisual={audiovisual}
          />
        ))}
    </section>
  )
}
