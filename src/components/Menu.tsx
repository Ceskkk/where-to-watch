import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

import { TMenuItem } from "../types"
import styles from "../styles/Menu.module.css"

const menuItems: Array<TMenuItem> = [
  {
    name: "Películas",
    link: "/peliculas",
    icon: "/icons/film-movie-icon.svg"
  },
  {
    name: "Series",
    link: "/series",
    icon: "/icons/tvseries-icon.svg"
  }
]

export default function Menu() {
  const router = useRouter()

  const goTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <nav className={styles.menu}>
      <li>
        <Link href="/" passHref>
          <a>
            <Image
              src="/icons/four-squares-icon.svg"
              alt={"Icono cuatro cuadrados"}
              width={30}
              height={30}
            />
          </a>
        </Link>
      </li>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={
            router.pathname === item.link ? styles.selected : undefined
          }
        >
          <Link href={item.link} passHref>
            <a>
              <Image
                src={item.icon}
                alt={`Icono de ${item.name}`}
                width={30}
                height={30}
              />
            </a>
          </Link>
        </li>
      ))}
      <li onClick={goTop}>
        <Image
          src="/icons/arrow-top.svg"
          alt={"Flecha arriba"}
          width={30}
          height={30}
        />
      </li>
    </nav>
  )
}
