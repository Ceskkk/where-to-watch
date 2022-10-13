import Image from "next/image"

import { IAudiovisual } from "../types"
import styles from "../styles/Card.module.css"
import { useState } from "react"

interface Props {
  audiovisual: IAudiovisual
}

export default function Card({ audiovisual }: Props) {
  const [isHovering, setIsHovered] = useState<boolean>(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return (
    <article className={styles.card}>
      <header>
        <Image
          src={audiovisual.image}
          alt={`Cover of ${audiovisual.title}`}
          width={341}
          height={192}
          layout="responsive"
          priority={true}
        />
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
    </article>
  )
}
