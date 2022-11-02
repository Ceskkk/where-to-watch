import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

import {
  getPopularMovies,
  getDailyTrendingAudiovisuals,
  getWeeklyTrendingAudiovisuals,
  getMovieById
} from "../../../services/audiovisuals"
import { IMovie, ISerie, ISingleMovie } from "../../../types"

const SingleMovie: NextPage<ISingleMovie> = (movie) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <h1>{movie.title}</h1>
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

  return {
    props: movie
  }
}

export default SingleMovie
