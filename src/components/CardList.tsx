import Card from "./Card"
import { IAudiovisual } from "../types"
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
        audiovisuals.map((audiovisual, index) => (
          <Card key={index} audiovisual={audiovisual} />
        ))}
    </section>
  )
}
