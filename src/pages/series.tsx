import { useState } from "react"
import type { GetServerSideProps, NextPage } from "next"

import Layout from "../layouts/Layout"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getPopular } from "../services/audiovisuals"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import { IAudiovisual } from "../types"

interface Props {
  audiovisuals: IAudiovisual[]
}

const TVSeries: NextPage<Props> = ({ audiovisuals }) => {
  const [moreAudiovisuals, setMoreAudiovisuals] =
    useState<IAudiovisual[]>(audiovisuals)
  const [page, setPage] = useState<number>(2)

  const { isLoading, setIsLoading } = useInfiniteScroll(loadMore)

  async function loadMore() {
    const audiovisuals: IAudiovisual[] = await getPopular("tv", page)

    setMoreAudiovisuals(moreAudiovisuals.concat(audiovisuals))
    setPage((prevValue) => prevValue + 1)
    setIsLoading(false)
  }

  return (
    <Layout title="Where to watch | TV Series">
      <Searcher />
      <section>
        <header>
          <h1>Series populares</h1>
        </header>
        <CardList audiovisuals={moreAudiovisuals} />
        {isLoading && <p>Cargando mas series...</p>}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const audiovisuals: IAudiovisual[] = await getPopular("tv", 1)

  return {
    props: { audiovisuals }
  }
}

export default TVSeries
