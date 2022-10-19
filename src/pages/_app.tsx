import type { AppProps } from "next/app"

import Layout from "../layouts/Layout"
import RouterProtector from "../layouts/RouterProtector"
import { AuthProvider } from "../contexts/AuthContext"
import { BookmarkProvider } from "../contexts/BookmarkContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <RouterProtector>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouterProtector>
      </BookmarkProvider>
    </AuthProvider>
  )
}

export default MyApp

// TODO: Add user config (?)
// TODO: Add real data
// TODO: Create audiovisual single page
// TODO: Animations on rerender cards
