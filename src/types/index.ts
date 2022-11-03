export interface IAudiovisual {
  backdrop_path: string
  id: number
  original_language: string
  overview: string
  poster_path: string
  genre_ids: number[]
  popularity: number
  vote_average: number
  vote_count: number
  adult?: boolean
  // If we search for movies and tvseries at the same time it exists
  media_type?: MEDIA_TYPE
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
  belongs_to_collection: TCollection | null
  budget: number
  revenue: number
  runtime: number
  genres: TGenre[]
  homepage: string
  production_countries: TProductionCountries[]
  spoken_languages: TLanguage[]
  status: string
  tagline: string
  imdb_id?: string
  production_companies?: TProductionCompanies[]
}

export interface ISingleSerie extends ISerie {}

export interface IProviders {
  link: string
  rent: IProvidersInfo[]
  buy: IProvidersInfo[]
  flatrate: IProvidersInfo[]
}

export interface IProvidersInfo {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export enum MEDIA_TYPE {
  MOVIE = "movie",
  TV = "tv",
  PERSON = "person"
}

export type TGenre = {
  id: number
  name: string
}

export type TLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type TProductionCountries = {
  iso_3166_1: string
  name: string
}

export type TProductionCompanies = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export type TCollection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export type TMenuItem = {
  name: string
  link: string
  icon: string
}
