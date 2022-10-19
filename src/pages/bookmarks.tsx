import { useContext, useEffect, useState } from "react"
import type { NextPage } from "next"

import { IAudiovisual } from "../types"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getAudiovisualsById } from "../services/audiovisuals"
import { BookmarkContext } from "../contexts/BookmarkContext"

const Bookmarks: NextPage = () => {
  const { bookmarkeds } = useContext(BookmarkContext)
  const [filteredAudiovisuals, setFilteredAudiovisuals] = useState<
    IAudiovisual[]
  >([])

  useEffect(() => {
    bookmarkeds && setFilteredAudiovisuals(getAudiovisualsById(bookmarkeds))
  }, [bookmarkeds])

  return (
    <>
      <Searcher />
      <section>
        <h1>Bookmarkeds</h1>
        <CardList audiovisuals={filteredAudiovisuals} />
      </section>
    </>
  )
}

export default Bookmarks
