import { IAudiovisual } from "../types"

const keyParams: string = `api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&region=ES&language=es&include_adult=false`

function filterBrokenPosters(audiovisuals: IAudiovisual[]) {
  return audiovisuals.filter((a: IAudiovisual) => a.poster_path !== null)
}

function filterPersonSearch(audiovisuals: IAudiovisual[]) {
  return audiovisuals.filter((r: IAudiovisual) => r.media_type !== "person")
}

export async function getDailyTrendingAudiovisuals(): Promise<IAudiovisual[]> {
  const res: Promise<IAudiovisual[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}trending/all/day?${keyParams}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))

  return res
}

export async function getWeeklyTrendingAudiovisuals(): Promise<IAudiovisual[]> {
  const res: Promise<IAudiovisual[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}trending/all/week?${keyParams}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))

  return res
}

export async function getPopularMovies(page: number): Promise<IAudiovisual[]> {
  const res: Promise<IAudiovisual[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}movie/popular?${keyParams}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))

  return res
}

export async function getPopularTVSeries(
  page: number
): Promise<IAudiovisual[]> {
  const res: Promise<IAudiovisual[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}tv/popular?${keyParams}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))

  return res
}

export async function getAudiovisualsByTitle(
  page: number,
  title: string = ""
): Promise<IAudiovisual[]> {
  const res: Promise<IAudiovisual[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}search/multi?${keyParams}&query=${title}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))
    .then((r) => r && filterPersonSearch(r))

  return res
}
