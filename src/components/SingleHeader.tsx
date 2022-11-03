import Image from "next/image"

import { formatDate, timeConverter } from "../utils/utils"
import { ISingleMovie } from "../types"
import styles from "../styles/SingleHeader.module.css"

export default function SingleHeader({ movie }: { movie: ISingleMovie }) {
  return (
    <header className={styles.header}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/original/${movie.poster_path})`
        }}
      />

      <div className={styles.poster}>
        <Image
          src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/w300/${movie.poster_path}`}
          alt={`Poster de ${movie.title}`}
          width={300}
          height={450}
        />
      </div>

      <div className={styles.info}>
        <h2>
          {movie.title}{" "}
          {movie.title !== movie.original_title && `(${movie.original_title})`}
        </h2>

        <p>
          <span>{formatDate(movie.release_date)}</span>
          &nbsp;·&nbsp;
          <span>{timeConverter(movie.runtime)}</span>
        </p>

        {movie.tagline && <i>{movie.tagline}</i>}
        <h3>Sinopsis</h3>
        <p>{movie.overview}</p>

        <p>
          {movie.genres &&
            movie.genres.map((genre, i) => {
              return genre.name + (i + 1 !== movie.genres.length ? ", " : "")
            })}
        </p>
      </div>
    </header>
  )
}
