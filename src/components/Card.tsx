import Image from "next/image"
import Link from "next/link"

import { IMovie, ISerie } from "../types"
import { isMovie } from "../types/guards"
import styles from "../styles/Card.module.css"

export default function Card({
  audiovisual
}: {
  audiovisual: IMovie | ISerie
}) {
  return (
    <article className={styles.card}>
      <Link
        href={`/${isMovie(audiovisual) ? "pelicula" : "serie"}/${
          audiovisual.id
        }`}
        passHref
      >
        <a>
          <header>
            <Image
              src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/w300/${audiovisual.poster_path}`}
              alt={`Portada de ${
                isMovie(audiovisual) ? audiovisual.title : audiovisual.name
              }`}
              width={300}
              height={450}
              layout="responsive"
              priority={true}
            />
          </header>
          <footer>
            <span>
              {isMovie(audiovisual)
                ? audiovisual.release_date
                : audiovisual.first_air_date}
            </span>
            <span> · </span>
            <span>{isMovie(audiovisual) ? "Película" : "Serie"}</span>
            <h3>
              {isMovie(audiovisual) ? audiovisual.title : audiovisual.name}
            </h3>
          </footer>
        </a>
      </Link>
    </article>
  )
}
