import type { AppProps } from "next/app"

import Layout from "../components/Layout"
import { AuthProvider } from "../contexts/AuthContext"
import { BookmarkProvider } from "../contexts/BookmarkContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BookmarkProvider>
    </AuthProvider>
  )
}

export default MyApp

// TODO: Restrict pages
// TODO: Add user config (?)
// TODO: Make bookmarks work
// TODO: Add real data
// TODO: Create audiovisual single page
// TODO: Animations on rerender cards
