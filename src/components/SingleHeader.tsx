import Image from "next/image"

import { formatDate, timeConverter } from "../utils/utils"
import { ISingleMovie, ISingleSerie } from "../types"
import styles from "../styles/SingleHeader.module.css"
import { isMovie } from "../types/guards"

export default function SingleHeader({
  audiovisual
}: {
  audiovisual: ISingleMovie | ISingleSerie
}) {
  const audiovisualTitle = isMovie(audiovisual)
    ? audiovisual.title
    : audiovisual.name

  const audiovisualOriginalTitle = isMovie(audiovisual)
    ? audiovisual.original_title
    : audiovisual.original_name

  const audiovisualRelease = isMovie(audiovisual)
    ? audiovisual.release_date
    : audiovisual.first_air_date

  const audiovisualRuntime = isMovie(audiovisual)
    ? audiovisual.runtime
    : audiovisual.episode_run_time[0]

  return (
    <header className={styles.header}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/original/${audiovisual.poster_path})`
        }}
      />

      <div className={styles.poster}>
        <Image
          src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/w300/${audiovisual.poster_path}`}
          alt={`Poster de ${audiovisualTitle}`}
          width={300}
          height={450}
        />
      </div>

      <div className={styles.info}>
        <h2>
          {isMovie(audiovisual) ? audiovisual.title : audiovisual.name}{" "}
          {audiovisualTitle !== audiovisualOriginalTitle &&
            `(${audiovisualOriginalTitle})`}
        </h2>

        <p>
          <span>{formatDate(audiovisualRelease)}</span>
          &nbsp;·&nbsp;
          <span>{timeConverter(audiovisualRuntime)}</span>
        </p>

        {audiovisual.tagline && <i>{audiovisual.tagline}</i>}
        <h3>Sinopsis</h3>
        <p>{audiovisual.overview}</p>

        <p>
          {audiovisual.genres &&
            audiovisual.genres.map((genre, i) => {
              return (
                genre.name + (i + 1 !== audiovisual.genres.length ? ", " : "")
              )
            })}
        </p>
      </div>
    </header>
  )
}
