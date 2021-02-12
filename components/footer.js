import Container from './container'
import Link from 'next/link'
import { BLOG_NAME } from '../lib/constants'

export default function Footer() {
  return (
    <footer>
      <div className="flex-col flex  site-footer mt-10">
        <Container>
          <div className="container-fluid pe-0 ps-0">
            <div className="row pt-8 pb-8">
              <div className="col">
                <Link href="/">
                  <a href="https://www.sitecore.com" target="_blank" className="mt-2 mb-2">Sitecore</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/">
                  <a href="https://doc.sitecore.com/" target="_blank" className="mt-2 mb-2">Sitecore Documentation</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/">
                  <a href="https://www.sitecore.com/request-a-demo" target="_blank" className="mt-2 mb-2">Request a Demo</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/">
                  <a href="https://www.youtube.com/user/mastersitecore" target="_blank" className="mt-2 mb-2">Discover Sitecore</a>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
