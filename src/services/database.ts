import { ref, get, child, set } from "firebase/database"

import { database } from "../utils/firebase/firebaseConfig"

export async function getBookmarks(userId: string): Promise<number[]> {
  let res: number[] = []

  await get(child(ref(database), "/" + userId))
    .then((value) => {
      if (value.val() !== null) res = value.val().bookmarkeds
    })
    .catch((e) => {
      console.error(e)
    })

  return res
}

export async function addBookmark(userId: string, audiovisualId: number) {
  await get(child(ref(database), "/" + userId))
    .then((prevValue) => {
      if (prevValue.exists()) {
        const newValue = prevValue.val().bookmarkeds
        newValue.push(audiovisualId)
        set(ref(database, "/" + userId), {
          bookmarkeds: newValue
        })
      } else {
        set(ref(database, "/" + userId), {
          bookmarkeds: [audiovisualId]
        })
      }
    })
    .catch((e) => {
      console.error(e)
    })
}

export async function removeBookmark(userId: string, audiovisualId: number) {
  await get(child(ref(database), "/" + userId))
    .then((prevValue) => {
      const newValue = prevValue
        .val()
        .bookmarkeds.filter((val: number) => val !== audiovisualId)
      set(ref(database, "/" + userId), {
        bookmarkeds: newValue
      })
    })
    .catch((e) => {
      console.error(e)
    })
}
