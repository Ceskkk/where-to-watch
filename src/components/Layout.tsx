import { ReactNode } from "react"

import Menu from "./Menu"
import styles from "../styles/Layout.module.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Menu />
      <main className={styles.main}>{children}</main>
    </>
  )
}
