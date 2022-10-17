import { auth } from "../utils/firebase/firebaseConfig"
import { IFormFields } from "../types"

export const createAccount = async (
  user: IFormFields
): Promise<void | string> => {
  try {
    await auth.createUserWithEmailAndPassword(user.email, user.password)
  } catch (e: any) {
    if (e.code == "auth/email-already-in-use") {
      return "The email address is already in use"
    } else {
      return "Server error, try again later"
    }
  }
}

export const signIn = async (user: IFormFields): Promise<void | string> => {
  try {
    await auth.signInWithEmailAndPassword(user.email, user.password)
  } catch (e: any) {
    if (e.code == "auth/user-not-found") {
      return "This user does not exist"
    } else {
      return "Server error, try again later"
    }
  }
}

export const signOut = async () => {
  await auth.signOut()
}
