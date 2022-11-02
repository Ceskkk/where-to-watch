export interface IAudiovisual {
  // Randomly sometimes exist
  adult?: boolean
  backdrop_path: string
  id: number
  original_language: string
  overview: string
  poster_path: string
  // If we search for movies and tvseries at the same time it exists
  media_type?: MEDIA_TYPE
  genre_ids: number[]
  popularity: number
  vote_average: number
  vote_count: number
}

export interface IMovie extends IAudiovisual {
  title: string
  original_title: string
  release_date: string
  video: boolean
}

export interface ISerie extends IAudiovisual {
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

export interface ISingleMovie extends IMovie {
  belongs_to_collection: string | null
  budget: number
  genres: Genre[]
  homepage: string
  imdb_id: string
  production_companies: any // ????????????
  status: string
  tagline: string
}

export interface ISingleSerie extends ISerie {}

export enum MEDIA_TYPE {
  MOVIE = "movie",
  TV = "tv",
  PERSON = "person"
}

export type Genre = {
  id: number
  name: string
}

export type TMenuItem = {
  name: string
  link: string
  icon: string
}
