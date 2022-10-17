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

export interface IFormFields {
  email: string
  password: string
}

export interface IRegisterFormFields extends IFormFields {
  confirmPassword: string
}
