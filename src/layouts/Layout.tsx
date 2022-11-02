import { ReactNode } from "react"
import Head from "next/head"

import Menu from "../components/Menu"
import styles from "../styles/Layout.module.css"

interface Props {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({
  children,
  title = "Where to watch",
  description = "Buscador de películas y series en plataformas streaming"
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Menu />
      <main className={styles.main}>{children}</main>
    </>
  )
}
