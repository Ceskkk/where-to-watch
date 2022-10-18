import { createContext, ReactNode, useEffect, useState } from "react"
import firebase from "firebase/compat/app"
import { auth } from "../utils/firebase/firebaseConfig"

export const AuthContext = createContext<firebase.User | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
