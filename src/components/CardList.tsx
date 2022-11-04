import Card from "./Card"
import { IAudiovisual, MEDIA_TYPE } from "../types"
import styles from "../styles/CardList.module.css"

export default function CardList({
  audiovisuals
}: {
  audiovisuals: IAudiovisual[]
}) {
  return (
    <section className={styles.list}>
      {audiovisuals &&
        audiovisuals.length > 0 &&
        audiovisuals.map((audiovisual) => (
          <Card
            key={
              audiovisual.media_type === MEDIA_TYPE.MOVIE
                ? `pelicula-${audiovisual.id}`
                : `serie-${audiovisual.id}`
            }
            audiovisual={audiovisual}
          />
        ))}
    </section>
  )
}
