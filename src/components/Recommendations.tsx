import CardList from "./CardList"
import { IAudiovisual } from "../types"
import _audiovisuals from "../mockup/audiovisuals.json"

const audiovisuals = _audiovisuals as Array<IAudiovisual>

export default function Recommendations() {
  return (
    <section>
      <h1>Recommended for you</h1>
      <CardList audiovisuals={audiovisuals} />
    </section>
  )
}
