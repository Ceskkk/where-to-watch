import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

import Layout from "../../../layouts/Layout"
import SingleHeader from "../../../components/SingleHeader"
import SingleFooter from "../../../components/SingleFooter"
import {
  getById,
  getPopular,
  getProvidersById,
  getTrending
} from "../../../services/audiovisuals"
import {
  IAudiovisual,
  IProviders,
  ISingleAudiovisual,
  MEDIA_TYPE
} from "../../../types"

interface Props {
  audiovisual: ISingleAudiovisual
  providers: IProviders
}

const SingleSerie: NextPage<Props> = ({ audiovisual, providers }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={`Where to watch | ${audiovisual.title}`}>
      <section>
        <SingleHeader audiovisual={audiovisual} />
        <SingleFooter providers={providers} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let id_list: string[] = []

  const audiovisuals: IAudiovisual[] = (await getTrending("day"))
    .concat(await getTrending("week"))
    .concat(await getPopular("tv", 1))

  audiovisuals.forEach((a) => {
    if (!a.media_type || a.media_type !== MEDIA_TYPE.MOVIE)
      id_list.push(String(a.id))
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

  const audiovisual: ISingleAudiovisual | null = await getById("tv", Number(id))
  const providers: IProviders[] | null = await getProvidersById(
    "tv",
    Number(id)
  )

  return {
    props: { audiovisual, providers }
  }
}

export default SingleSerie
