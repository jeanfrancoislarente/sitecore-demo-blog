import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'

export default function Four0four() {
  return (
    <Layout>
      <Head>
        <title>Sitecore Demo Blog - This is not the page you are looking for...</title>
      </Head>
      <Container>
        <h1>Uh Oh!</h1>
        <h3>We know this is not the page you want to see. </h3>
        <p>
        But we could not find the page you are looking for. It could have:
        </p>
        <ul>
          <li>Moved to another place</li>
          <li>Renamed to a better name</li>
          <li>Deemed useless and has been deleted, or</li>
          <li>Never existed in the first place</li>
        </ul>
        <p>
          <Link href="/">
            <a>
              Please click here and go back to the home page and read all the other useful blogs we have to offer.
              </a>
          </Link>
        </p>
      </Container>
    </Layout>
  )
}

