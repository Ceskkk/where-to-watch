import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

import {
  getSerieById,
  getPopularTVSeries,
  getDailyTrendingAudiovisuals,
  getWeeklyTrendingAudiovisuals
} from "../../../services/audiovisuals"
import { IMovie, ISerie, ISingleSerie } from "../../../types"

const SingleSerie: NextPage<ISingleSerie> = (serie) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <h1>{serie.name}</h1>
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

  return {
    props: serie
  }
}

export default SingleSerie
