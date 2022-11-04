import type { AppProps } from "next/app"

import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

// TODO: El buscador funciona pocho. Hace busquedas antiguas. Que orden sigue?
// TODO: Idea Marlene: Botó de tirar enrrere
