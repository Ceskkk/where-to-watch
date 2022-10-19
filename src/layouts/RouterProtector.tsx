import { ReactNode, useContext } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"

export default function RouterProtector({ children }: { children: ReactNode }) {
  const user = useContext(AuthContext)
  const router = useRouter()

  const noAuthProtected: string[] = ["/bookmarks", "/user/settings"]
  const authProtected: string[] = ["/user/access"]

  if (!user && noAuthProtected.includes(router.pathname)) {
    router.replace("/user/access")
    return null
  }

  if (user && authProtected.includes(router.pathname)) {
    router.replace("/user/settings")
    return null
  }

  return <>{children}</>
}
