import type { GetStaticProps, NextPage } from "next"

import { IAudiovisual } from "../types"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getAllAudiovisuals } from "../services/audiovisuals"

interface Props {
  audiovisuals: Array<IAudiovisual>
}

const Bookmarks: NextPage<Props> = ({ audiovisuals }) => {
  return (
    <>
      <Searcher />
      <section>
        <h1>Bookmarkeds</h1>
        <CardList audiovisuals={audiovisuals} />
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const audiovisuals: Array<IAudiovisual> = getAllAudiovisuals()

  return {
    props: {
      audiovisuals
    }
  }
}

export default Bookmarks
