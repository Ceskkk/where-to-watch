export interface IAudiovisual {
  id: number
  title: string
  type: "Movie" | "TV Series"
  year: number
  image: string
}

export type TMenuItem = {
  name: string
  link: string
  icon: string
}
