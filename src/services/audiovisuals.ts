import { IAudiovisual } from "../types"
import _audiovisuals from "../mockup/audiovisuals.json"

const audiovisuals = _audiovisuals as Array<IAudiovisual>

export function getAllAudiovisuals(): Array<IAudiovisual> {
  return audiovisuals
}

export function getAudiovisualsById(ids: number[]): Array<IAudiovisual> {
  let res: Array<IAudiovisual> = []

  ids.forEach((id) => {
    const audiovisual = audiovisuals.find((a) => a.id === id)
    audiovisual && res.push(audiovisual)
  })

  return res
}

export function getAudiovisualsByTitle(title: string): Array<IAudiovisual> {
  return audiovisuals.filter((a) =>
    a.title.toLowerCase().includes(title.toLowerCase())
  )
}

export function getAudiovisualsByType(type: string): Array<IAudiovisual> {
  return audiovisuals.filter((a) => a.type === type)
}
