export interface IAudiovisual {
  adult?: boolean
  backdrop_path: string
  id: number
  original_language: string
  overview: string
  poster_path: string
  // Si hacemos busqueda de todos este valor existe
  media_type?: "movie" | "tv" | "person"
  genre_ids: number[]
  popularity: number
  vote_average: number
  vote_count: number
  // Es película
  title?: string
  original_title?: string
  release_date?: string
  video?: boolean
  // Es serie
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
}

export type TMenuItem = {
  name: string
  link: string
  icon: string
}
