import Image from "next/image"

import { formatDate, timeConverter } from "../utils/utils"
import { ISingleAudiovisual } from "../types"
import styles from "../styles/SingleHeader.module.css"

export default function SingleHeader({
  audiovisual
}: {
  audiovisual: ISingleAudiovisual
}) {
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
          alt={`Poster de ${audiovisual.title}`}
          width={300}
          height={450}
        />
      </div>

      <div className={styles.info}>
        <h2>
          {audiovisual.title}{" "}
          {audiovisual.title !== audiovisual.original_title &&
            `(${audiovisual.original_title})`}
        </h2>

        <p>
          <span>{formatDate(audiovisual.release_date)}</span>
          {audiovisual.runtime ? (
            <>
              &nbsp;·&nbsp;
              <span>{timeConverter(audiovisual.runtime)}</span>
            </>
          ) : (
            ""
          )}
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
