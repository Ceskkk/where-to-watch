import { useContext, FormEvent } from "react"
import { signOut } from "../services/auth"

import { AuthContext } from "../contexts/AuthContext"
import { useRouter } from "next/router"

export default function UserSettings() {
  const router = useRouter()
  const user = useContext(AuthContext)

  const logoutUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signOut().then(() => {
      router.push("/user/access")
    })
  }

  return (
    <>
      <h2>Logged in as {user?.email}</h2>
      <section>
        <form onSubmit={(e) => logoutUser(e)}>
          <button>Logout</button>
        </form>
      </section>
    </>
  )
}
