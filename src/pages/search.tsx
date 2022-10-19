import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"

import { IAudiovisual } from "../types"
import Searcher from "../components/Searcher"
import CardList from "../components/CardList"
import { getAllAudiovisuals, getAudiovisualsByTitle } from "../services/audiovisuals"
import Layout from "../layouts/Layout"

interface Props {
  audiovisuals: Array<IAudiovisual>
}

interface IParams extends ParsedUrlQuery {
  title?: string
}

const Search: NextPage<Props> = ({ audiovisuals }) => {
  const router = useRouter()
  const { title } = router.query

  return (
    <Layout title="Where to watch | Search">
      <Searcher />
      <section>
        <h1>
          Found {audiovisuals.length} results for &apos;{title}&apos;
        </h1>
        <CardList audiovisuals={audiovisuals} />
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  const { title } = params.query as IParams
  let audiovisuals: Array<IAudiovisual>

  title || title === ''
    ? (audiovisuals = getAudiovisualsByTitle(title))
    : (audiovisuals = getAllAudiovisuals())

  return {
    props: {
      audiovisuals
    }
  }
}

export default Search
