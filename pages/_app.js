import '../styles/index.css'
import '../styles/bootstrap.css'

import Router from 'next/router'

import * as gtag from '../lib/gtag'

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
