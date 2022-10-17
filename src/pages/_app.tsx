import type { AppProps } from "next/app"

import Layout from "../components/Layout"
import { AuthProvider } from "../contexts/AuthContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

// TODO: Restrict pages
// TODO: Add user config (?)
// TODO: Change user icon and logout icon
// TODO: Make bookmarks work
// TODO: Add real data
// TODO: Create audiovisual single page
// TODO: Animations on rerender cards
