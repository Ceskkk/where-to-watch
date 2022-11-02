import { IMovie, ISerie } from "."

export function isMovie(audiovisual: IMovie | ISerie): audiovisual is IMovie {
  return (audiovisual as IMovie).title !== undefined
}
