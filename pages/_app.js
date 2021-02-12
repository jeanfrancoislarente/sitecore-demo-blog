import Router from 'next/router'
import '../styles/index.css'
import '../styles/bootstrap.css'
import * as gtag from '../lib/gtag'
import { IS_PRODUCTION } from '../lib/constants'

if (IS_PRODUCTION) {
  Router.events.on('routeChangeComplete', (url) => gtag.pageSetup(url))
}

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
