import Image from "next/image"
import Link from "next/link"

import { IAudiovisual } from "../types"
import styles from "../styles/Card.module.css"

export default function Card({ audiovisual }: { audiovisual: IAudiovisual }) {
  return (
    <article className={styles.card}>
      <Link href={`/audiovisuals/${audiovisual.id}`} passHref>
        <a>
          <header>
            <Image
              src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}${audiovisual.poster_path}`}
              alt={`Portada de ${audiovisual.title || audiovisual.name}`}
              width={300}
              height={450}
              layout="responsive"
              priority={true}
            />
          </header>
          <footer>
            <span>
              {audiovisual.release_date || audiovisual.first_air_date}
            </span>
            <span> · </span>
            <span>{audiovisual.title ? "Película" : "Serie"}</span>
            <h3>{audiovisual.title || audiovisual.name}</h3>
          </footer>
        </a>
      </Link>
    </article>
  )
}
