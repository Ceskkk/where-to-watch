import { auth } from "./firebaseConfig"
import { IFormFields } from "../../types"

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

// const signIn = async () => {
//   try {
//     await auth.signInWithEmailAndPassword(
//       emailRef.current!.value,
//       passwordRef.current!.value
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

export const signOut = async () => {
  await auth.signOut()
}
