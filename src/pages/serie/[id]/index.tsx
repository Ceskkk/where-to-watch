import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "../../../layouts/Layout"
import SingleHeader from "../../../components/SingleHeader"
import SingleFooter from "../../../components/SingleFooter"
import {
  getSerieById,
  getPopularTVSeries,
  getDailyTrendingAudiovisuals,
  getWeeklyTrendingAudiovisuals,
  getSerieProvidersById
} from "../../../services/audiovisuals"
import { IMovie, IProviders, ISerie, ISingleSerie } from "../../../types"

interface Props {
  serie: ISingleSerie
  providers: IProviders
}

const SingleSerie: NextPage<Props> = ({ serie, providers }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={`Where to watch | ${serie.name}`}>
      <section>
        <SingleHeader audiovisual={serie} />
        <SingleFooter providers={providers} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let id_list: string[] = []

  const audiovisuals: (ISerie | IMovie)[] = (
    await getDailyTrendingAudiovisuals()
  )
    .concat(await getWeeklyTrendingAudiovisuals())
    .concat(await getPopularTVSeries(1))

  audiovisuals.forEach((a) => {
    if (!a.media_type || a.media_type !== "movie") id_list.push(String(a.id))
  })

  const paths = id_list.map((id) => {
    return {
      params: { id }
    }
  })
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!

  const serie: ISingleSerie = await getSerieById(Number(id))
  const providers: IProviders[] | null = await getSerieProvidersById(Number(id))

  return {
    props: { serie, providers }
  }
}

export default SingleSerie
