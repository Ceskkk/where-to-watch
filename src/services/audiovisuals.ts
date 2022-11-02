import { IMovie, ISingleMovie, ISingleSerie, ISerie } from "../types"

const keyParams: string = `api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&region=ES&language=es&include_adult=false`

function filterBrokenPosters(audiovisuals: (IMovie | ISerie)[]) {
  return audiovisuals.filter((a: IMovie | ISerie) => a.poster_path !== null)
}

function filterPersonSearch(audiovisuals: (IMovie | ISerie)[]) {
  return audiovisuals.filter((r: IMovie | ISerie) => r.media_type !== "person")
}

export async function getDailyTrendingAudiovisuals(): Promise<
  (IMovie | ISerie)[]
> {
  const res: Promise<(IMovie | ISerie)[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}trending/all/day?${keyParams}`
  )
    .then((r) => r.json())
    .then((r) => r.results)

  return res
}

export async function getWeeklyTrendingAudiovisuals(): Promise<
  (IMovie | ISerie)[]
> {
  const res: Promise<(IMovie | ISerie)[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}trending/all/week?${keyParams}`
  )
    .then((r) => r.json())
    .then((r) => r.results)

  return res
}

export async function getPopularMovies(page: number): Promise<IMovie[]> {
  const res: Promise<IMovie[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}movie/popular?${keyParams}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)

  return res
}

export async function getPopularTVSeries(page: number): Promise<ISerie[]> {
  const res: Promise<ISerie[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}tv/popular?${keyParams}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)

  return res
}

export async function getAudiovisualsByTitle(
  page: number,
  title: string = ""
): Promise<(IMovie | ISerie)[]> {
  const res: Promise<(IMovie | ISerie)[]> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}search/multi?${keyParams}&query=${title}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))
    .then((r) => r && filterPersonSearch(r))

  return res
}

export async function getMovieById(id: number): Promise<ISingleMovie> {
  const res: Promise<ISingleMovie> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}movie/${id}?${keyParams}`
  ).then((r) => r.json())

  return res
}

export async function getSerieById(id: number): Promise<ISingleSerie> {
  const res: Promise<ISingleSerie> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}tv/${id}?${keyParams}`
  ).then((r) => r.json())

  return res
}
