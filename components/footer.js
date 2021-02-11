import Container from './container'
import Link from 'next/link'
import { BLOG_NAME } from '../lib/constants'

export default function Footer() {
  return (
    <footer>
      <div className="flex-col md:flex-row flex items-center md:justify-between bg-gray-600 text-white mt-10">
        <Container>
          <div className="container-fluid pe-0 ps-0">
            <div className="row pt-8 pb-8">
              <div className="col">
                <Link href="/">
                  <a className="mt-2 mb-2" href="sitecore.com">Homepage</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/">
                  <a className="mt-2 mb-2" href="sitecore.com">documentation</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/">
                  <a className="mt-2 mb-2" href="sitecore.com">Container Repository</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/">
                  <a className="mt-2 mb-2" href="sitecore.com">Ask for a Demo</a>
                </Link>
              </div>
            </div>
            <div className="row text-center pb-8">
              <div className="col">
                <Link href="/">
                  <a className="mt-2 mb-2" href="sitecore.com">The source of this site is on github</a>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
