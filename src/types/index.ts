export interface IAudiovisual {
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string
  media_type: MEDIA_TYPE
}

export interface ISingleAudiovisual extends IAudiovisual {
  genres: TGenre[]
  runtime?: number
  tagline?: string
}

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

export type TGenre = {
  id: number
  name: string
}

export enum MEDIA_TYPE {
  MOVIE = "movie",
  TV = "tv",
  PERSON = "person"
}

export type TMenuItem = {
  name: string
  link: string
  icon: string
}
