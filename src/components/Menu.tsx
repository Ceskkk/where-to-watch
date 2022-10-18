import { useContext } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

import { TMenuItem } from "../types"
import { AuthContext } from "../contexts/AuthContext"
import styles from "../styles/Menu.module.css"

const menuItems: Array<TMenuItem> = [
  {
    name: "Movies",
    link: "/movies",
    icon: "/icons/film-movie-icon.svg"
  },
  {
    name: "TV Series",
    link: "/tvseries",
    icon: "/icons/tvseries-icon.svg"
  },
  {
    name: "Bookmarks",
    link: "/bookmarks",
    icon: "/icons/checked-bookmark-icon.svg"
  }
]

export default function Menu() {
  const router = useRouter()
  const user = useContext(AuthContext)

  return (
    <nav className={styles.menu}>
      <li>
        <Link href="/" passHref>
          <a>
            <Image
              src="/icons/four-squares-icon.svg"
              alt={"movies icon"}
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
                alt={`${item.name} icon`}
                width={20}
                height={20}
              />
            </a>
          </Link>
        </li>
      ))}
      <li>
        <Link href={user ? "/user/settings" : "/user/access"} passHref>
          <a>
            {user ? (
              <Image
                src="/icons/settings-icon.svg"
                alt={"logout icon"}
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/icons/user-profile-icon.svg"
                alt={"user icon"}
                width={30}
                height={30}
              />
            )}
          </a>
        </Link>
      </li>
    </nav>
  )
}
