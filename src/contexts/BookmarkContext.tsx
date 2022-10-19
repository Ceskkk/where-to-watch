import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

import { AuthContext } from "./AuthContext"
import { addBookmark, getBookmarks, removeBookmark } from "../services/database"
import { auth } from "../utils/firebase/firebaseConfig"

interface Props {
  bookmarksLoading: boolean
  bookmarkeds: number[] | undefined
  handleBookmarkAction: (audiovisualId: number) => void | boolean
}

const defaultProps = {
  bookmarksLoading: false,
  bookmarkeds: undefined,
  handleBookmarkAction: () => {}
}

export const BookmarkContext = createContext<Props>(defaultProps)

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const user = useContext(AuthContext)
  const [bookmarksLoading, setBookmarksLoading] = useState(false)
  const [bookmarkeds, setBookmarkeds] = useState<number[] | undefined>(
    undefined
  )

  const updateContextBookmarks = (userId: string) => {
    getBookmarks(userId).then((res) => {
      setBookmarkeds(res)
      setBookmarksLoading(false)
    })
  }

  const handleBookmarkAction = (audiovisualId: number) => {
    setBookmarksLoading(true)
    if (!user) return false
    else if (bookmarkeds?.includes(audiovisualId)) {
      removeBookmark(user.uid, audiovisualId).then(() =>
        updateContextBookmarks(user.uid)
      )
    } else {
      addBookmark(user.uid, audiovisualId).then(() =>
        updateContextBookmarks(user.uid)
      )
    }
  }

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      firebaseUser
        ? updateContextBookmarks(firebaseUser.uid)
        : setBookmarkeds([])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BookmarkContext.Provider
      value={{ bookmarksLoading, bookmarkeds, handleBookmarkAction }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}
