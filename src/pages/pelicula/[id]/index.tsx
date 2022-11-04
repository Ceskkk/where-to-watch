import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "../../../layouts/Layout"
import SingleHeader from "../../../components/SingleHeader"
import SingleFooter from "../../../components/SingleFooter"
import {
  getPopularMovies,
  getDailyTrendingAudiovisuals,
  getWeeklyTrendingAudiovisuals,
  getMovieById,
  getMovieProvidersById
} from "../../../services/audiovisuals"
import { IMovie, IProviders, ISerie, ISingleMovie } from "../../../types"

interface Props {
  movie: ISingleMovie
  providers: IProviders
}

const SingleMovie: NextPage<Props> = ({ movie, providers }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={`Where to watch | ${movie.title}`}>
      <section>
        <SingleHeader audiovisual={movie} />
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
    .concat(await getPopularMovies(1))

  audiovisuals.forEach((a) => {
    if (!a.media_type || a.media_type !== "tv") id_list.push(String(a.id))
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

  const movie: ISingleMovie = await getMovieById(Number(id))
  const providers: IProviders[] | null = await getMovieProvidersById(Number(id))

  return {
    props: { movie, providers }
  }
}

export default SingleMovie
