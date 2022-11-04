import { useState } from "react"
import type { GetServerSideProps, NextPage } from "next"

import Layout from "../layouts/Layout"
import CardList from "../components/CardList"
import Searcher from "../components/Searcher"
import { getTrending } from "../services/audiovisuals"
import { IAudiovisual } from "../types"

interface Props {
  dailyAudiovisuals: IAudiovisual[]
  weeklyAudiovisuals: IAudiovisual[]
}

const Home: NextPage<Props> = ({ dailyAudiovisuals, weeklyAudiovisuals }) => {
  const [showDaily, toggleAudiovisuals] = useState<boolean>(true)

  return (
    <Layout title="Where to watch | Tendencias">
      <Searcher />
      <section>
        <header>
          <h1>Tendencias</h1>
          <div
            className="toggler"
            onClick={() => toggleAudiovisuals(!showDaily)}
          >
            <h3>Hoy</h3>
            <h3>Esta semana</h3>
            <div
              className={`togglerBackground ${showDaily ? "left" : "right"}`}
            ></div>
          </div>
        </header>
        <CardList
          audiovisuals={showDaily ? dailyAudiovisuals : weeklyAudiovisuals}
        />
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const dailyAudiovisuals: IAudiovisual[] = await getTrending("day")
  const weeklyAudiovisuals: IAudiovisual[] = await getTrending("week")

  return {
    props: { dailyAudiovisuals, weeklyAudiovisuals }
  }
}

export default Home
