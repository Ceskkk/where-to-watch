import type { GetStaticProps, NextPage } from "next"

import { IAudiovisual } from "../types"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getAudiovisualsByType } from "../services/audiovisuals"
import Layout from "../layouts/Layout"

interface Props {
  audiovisuals: Array<IAudiovisual>
}

const Movies: NextPage<Props> = ({ audiovisuals }) => {
  return (
    <Layout title="Where to watch | Movies">
      <Searcher />
      <section>
        <h1>Movies</h1>
        <CardList audiovisuals={audiovisuals} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const audiovisuals: Array<IAudiovisual> = getAudiovisualsByType("Movie")

  return {
    props: {
      audiovisuals
    }
  }
}

export default Movies
