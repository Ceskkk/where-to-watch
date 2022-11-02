import { useState } from "react"
import type { GetServerSideProps, NextPage } from "next"

import Layout from "../layouts/Layout"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getPopularMovies } from "../services/audiovisuals"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import { IMovie } from "../types"

interface Props {
  audiovisuals: IMovie[]
}

const Movies: NextPage<Props> = ({ audiovisuals }) => {
  const [moreAudiovisuals, setMoreAudiovisuals] =
    useState<IMovie[]>(audiovisuals)
  const [page, setPage] = useState<number>(2)

  const { isLoading, setIsLoading } = useInfiniteScroll(loadMore)

  async function loadMore() {
    const audiovisuals: IMovie[] = await getPopularMovies(page)

    setMoreAudiovisuals(moreAudiovisuals.concat(audiovisuals))
    setPage((prevValue) => prevValue + 1)
    setIsLoading(false)
  }

  return (
    <Layout title="Where to watch | Películas">
      <Searcher />
      <section>
        <header>
          <h1>Películas populares</h1>
        </header>
        <CardList audiovisuals={moreAudiovisuals} />
        {isLoading && <p>Cargando más películas...</p>}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const audiovisuals: IMovie[] = await getPopularMovies(1)

  return {
    props: { audiovisuals }
  }
}

export default Movies
