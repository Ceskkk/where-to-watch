import {
  IAudiovisual,
  IProviders,
  ISingleAudiovisual,
  MEDIA_TYPE
} from "../types"
import { averageRuntime } from "../utils/utils"

const keyParams: string = `api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&region=ES&language=es&include_adult=false`

/**
 * Filter audiovisuals without poster
 */
function filterBrokenPosters(audiovisuals: IAudiovisual[]) {
  return audiovisuals.filter((a: IAudiovisual) => a.poster_path !== null)
}

/**
 * Filter persons from audiovisuals
 */
function filterPersonSearch(audiovisuals: IAudiovisual[]) {
  return audiovisuals.filter((a: IAudiovisual) => a.media_type !== "person")
}

/**
 * Get daily or weekly trending audiovisuals
 */
export async function getTrending(
  when: "day" | "week"
): Promise<IAudiovisual[]> {
  let audiovisuals: IAudiovisual[] = []

  await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}/trending/all/${when}?${keyParams}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) =>
      r.forEach((a: any) => {
        audiovisuals.push({
          id: a.id,
          title: a.title || a.name,
          original_title: a.original_title || a.original_name,
          overview: a.overview,
          release_date: a.release_date || a.first_air_date,
          poster_path: a.poster_path,
          media_type: a.media_type
        })
      })
    )

  return audiovisuals
}

/**
 * Get popular movies or series
 */
export async function getPopular(
  type: "movie" | "tv",
  page: number
): Promise<IAudiovisual[]> {
  let audiovisuals: IAudiovisual[] = []

  await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}/${type}/popular?${keyParams}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) =>
      r.forEach((a: any) => {
        audiovisuals.push({
          id: a.id,
          title: a.title || a.name,
          original_title: a.original_title || a.original_name,
          overview: a.overview,
          release_date: a.release_date || a.first_air_date,
          poster_path: a.poster_path,
          media_type: type as MEDIA_TYPE
        })
      })
    )

  return audiovisuals
}

/**
 * Get movies or series by id
 */
export async function getById(
  type: "movie" | "tv",
  id: number
): Promise<ISingleAudiovisual | null> {
  let audiovisual: ISingleAudiovisual | null = null

  await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}/${type}/${id}?${keyParams}`
  )
    .then((r) => r.json())
    .then((a) => {
      audiovisual = {
        id: a.id,
        title: a.title || a.name,
        original_title: a.original_title || a.original_name,
        overview: a.overview,
        release_date: a.release_date || a.first_air_date,
        poster_path: a.poster_path,
        media_type: type as MEDIA_TYPE,
        genres: a.genres,
        tagline: a.tagline,
        runtime: a.runtime || averageRuntime(a.episode_run_time)
      }
    })

  return audiovisual
}

/**
 * Search movies or series by title
 */
export async function getAudiovisualsByTitle(
  page: number,
  title: string = ""
): Promise<IAudiovisual[]> {
  let audiovisuals: IAudiovisual[] = []

  await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}/search/multi?${keyParams}&query=${title}&page=${page}`
  )
    .then((r) => r.json())
    .then((r) => r.results)
    .then((r) => r && filterBrokenPosters(r))
    .then((r) => r && filterPersonSearch(r))
    .then((r) =>
      r.forEach((a: any) => {
        audiovisuals.push({
          id: a.id,
          title: a.title || a.name,
          original_title: a.original_title || a.original_name,
          overview: a.overview,
          release_date: a.release_date || a.first_air_date,
          poster_path: a.poster_path,
          media_type: a.media_type
        })
      })
    )

  return audiovisuals
}

/**
 * Get providers by audiovisual id
 */
export async function getProvidersById(
  type: "movie" | "tv",
  id: number
): Promise<IProviders[] | null> {
  const res: Promise<IProviders[] | null> = await fetch(
    `${process.env.NEXT_PUBLIC_THEMOVIEDB_API_URL}/${type}/${id}/watch/providers?${keyParams}`
  )
    .then((r) => r && r.json())
    .then((r) => r && r.results.ES)

  return res || null
}
