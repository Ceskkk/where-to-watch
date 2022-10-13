import { MouseEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { IAudiovisual } from "../types"
import styles from "../styles/Card.module.css"

interface Props {
  audiovisual: IAudiovisual
}

export default function Card({ audiovisual }: Props) {
  const [isHovering, toggleHovered] = useState<boolean>(false)
  const onMouseEnter = () => toggleHovered(true)
  const onMouseLeave = () => toggleHovered(false)

  const addToBookmarks = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
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
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={(e) => addToBookmarks(e)}
            >
              {isHovering ? (
                <Image
                  src="/icons/checked-bookmark-icon.svg"
                  alt="Checked bookmark icon"
                  width={15}
                  height={15}
                />
              ) : (
                <Image
                  src="/icons/unchecked-bookmark-icon.svg"
                  alt="Unchecked bookmark icon"
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
