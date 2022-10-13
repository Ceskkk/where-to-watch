import type { NextPage } from "next"

import Searcher from "../components/Searcher"
import Recommendations from "../components/Recommendations"

const Home: NextPage = () => {
  return (
    <>
      <Searcher />
      <Recommendations />
    </>
  )
}

export default Home
