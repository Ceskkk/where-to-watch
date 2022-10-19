import type { GetStaticProps, NextPage } from "next"

import { IAudiovisual } from "../types"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getAllAudiovisuals } from "../services/audiovisuals"

interface Props {
  audiovisuals: Array<IAudiovisual>
}

const Home: NextPage<Props> = ({ audiovisuals }) => {
  return (
    <>
      <Searcher />
      <section>
        <h1>News</h1>
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

export default Home
