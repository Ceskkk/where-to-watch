import Image from "next/image"
import Link from "next/link"

import { IAudiovisual, MEDIA_TYPE } from "../types"
import styles from "../styles/Card.module.css"

export default function Card({ audiovisual }: { audiovisual: IAudiovisual }) {
  return (
    <article className={styles.card}>
      <Link
        href={`/${
          audiovisual.media_type === MEDIA_TYPE.MOVIE ? "pelicula" : "serie"
        }/${audiovisual.id}`}
        passHref
      >
        <a>
          <header>
            <Image
              src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/w300/${audiovisual.poster_path}`}
              alt={`Portada de ${audiovisual.title}`}
              width={300}
              height={450}
              layout="responsive"
              priority={true}
              placeholder="blur"
              blurDataURL="/skeleton.png"
            />
          </header>
          <footer>
            <span>{audiovisual.release_date}</span>
            <span> · </span>
            <span>
              {audiovisual.media_type === MEDIA_TYPE.MOVIE
                ? "Película"
                : "Serie"}
            </span>
            <h3>{audiovisual.title}</h3>
          </footer>
        </a>
      </Link>
    </article>
  )
}
