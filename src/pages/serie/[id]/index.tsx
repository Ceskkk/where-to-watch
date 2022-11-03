import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"

import Layout from "../../../layouts/Layout"
import {
  getSerieById,
  getPopularTVSeries,
  getDailyTrendingAudiovisuals,
  getWeeklyTrendingAudiovisuals
} from "../../../services/audiovisuals"
import { IMovie, ISerie, ISingleSerie } from "../../../types"
import styles from "../../../styles/SerieId.module.css"

const SingleSerie: NextPage<ISingleSerie> = (serie) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={`Where to watch | ${serie.name}`}>
      <section>
        <header className={styles.header}>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/original/${serie.poster_path})`
            }}
          />
          <div className={styles.poster}>
            <Image
              src={`${process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_URL}/w300/${serie.poster_path}`}
              alt={`Poster de ${serie.name}`}
              width={300}
              height={450}
            />
          </div>
          <div>
            <h1>
              {serie.name} ({serie.original_name})
            </h1>
          </div>
        </header>
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

  return {
    props: serie
  }
}

export default SingleSerie
