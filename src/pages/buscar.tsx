import { useState } from "react"
import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"

import { IMovie, ISerie } from "../types"
import { getAudiovisualsByTitle } from "../services/audiovisuals"
import Layout from "../layouts/Layout"
import Searcher from "../components/Searcher"
import CardList from "../components/CardList"
import useInfiniteScroll from "../hooks/useInfiniteScroll"

interface Props {
  audiovisuals: (IMovie | ISerie)[]
}

interface IParams extends ParsedUrlQuery {
  title?: string
}

const Search: NextPage<Props> = ({ audiovisuals }) => {
  const router = useRouter()
  const { title } = router.query

  const [moreAudiovisuals, setMoreAudiovisuals] =
    useState<(IMovie | ISerie)[]>(audiovisuals)

  const { isLoading, page } = useInfiniteScroll(loadMore)

  async function loadMore() {
    const audiovisuals: (IMovie | ISerie)[] = await getAudiovisualsByTitle(
      page,
      title as string
    )

    setMoreAudiovisuals(moreAudiovisuals.concat(audiovisuals))
  }

  return (
    <Layout title="Where to watch | Buscar">
      <Searcher />
      <section>
        <h1>Resultados de &apos;{title}&apos;</h1>
        <CardList audiovisuals={moreAudiovisuals} />
        {isLoading && <p>Cargando más...</p>}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  const { title } = params.query as IParams
  const audiovisuals: (IMovie | ISerie)[] = await getAudiovisualsByTitle(
    1,
    title
  )

  if (audiovisuals) return { props: { key: title, audiovisuals } }

  return {
    redirect: {
      permanent: false,
      destination: "/"
    }
  }
}

export default Search