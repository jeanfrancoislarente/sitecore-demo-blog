import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import Intro from '../components/intro'
import Footer from '../components/footer'

export default function Four0four() {
  return (
    <Layout>
      <Head>
        <title>Sitecore Demo Blog - This is not the page you are looking for...</title>
      </Head>
      <Intro />
      <Container>
        <h1>Uh Oh!</h1>
        <h3>We know this is not the page you want to see. </h3>
        <p>
          We could not find the page you are looking for. It could have:
        </p>
        <ul>
          <li>moved to another place</li>
          <li>renamed to a better name</li>
          <li>been deemed useless and have been deleted, or</li>
          <li>never existed in the first place</li>
        </ul>
        <p>
          <Link href="/">
            <a>
              Please click here and go back to the home page and read all the other useful blogs we have to offer.
            </a>
          </Link>
        </p>
      </Container>
      <Footer />
    </Layout>
  )
}

