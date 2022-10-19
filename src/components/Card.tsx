import { MouseEvent, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

import { IAudiovisual } from "../types"
import { BookmarkContext } from "../contexts/BookmarkContext"
import styles from "../styles/Card.module.css"

export default function Card({ audiovisual }: { audiovisual: IAudiovisual }) {
  const router = useRouter()
  const { bookmarksLoading, bookmarkeds, handleBookmarkAction } =
    useContext(BookmarkContext)

  const handleBookmark = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const res = handleBookmarkAction(audiovisual.id)
    if (res === false) router.push("/user/access")
  }

  return (
    <article className={styles.card}>
      <Link href={`/audiovisuals/${audiovisual.id}`} passHref>
        <a>
          <header>
            <Image
              src={audiovisual.image}
              alt={`Cover of ${audiovisual.title}`}
              width={341}
              height={192}
              layout="responsive"
              priority={true}
            />
            <div
              onClick={(e) => handleBookmark(e)}
              style={{ pointerEvents: bookmarksLoading ? "none" : "auto" }}
            >
              {bookmarkeds && bookmarkeds.includes(audiovisual.id) ? (
                <Image
                  src="/icons/checked-bookmark-icon.svg"
                  alt="Unchecked bookmark icon"
                  width={15}
                  height={15}
                />
              ) : (
                <Image
                  src="/icons/unchecked-bookmark-icon.svg"
                  alt="Checked bookmark icon"
                  width={15}
                  height={15}
                />
              )}
            </div>
          </header>
          <footer>
            <span>{audiovisual.year}</span>
            <span> · </span>
            <span>{audiovisual.type}</span>
            <h3>{audiovisual.title}</h3>
          </footer>
        </a>
      </Link>
    </article>
  )
}
