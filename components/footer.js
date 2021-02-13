import Container from './container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="site-footer mt-10 bottom-0 w-full text-left">
        <Container>
          <div className="container-fluid pe-0 ps-0">
            <div className="row pt-8 pb-8">
              <div className="col-12 col-md-3">
                <Link href="/">
                  <a href="https://www.sitecore.com" target="_blank" className="mt-2 mb-2">Sitecore</a>
                </Link>
              </div>
              <div className="col-12 col-md-3">
                <Link href="/">
                  <a href="https://doc.sitecore.com/" target="_blank" className="mt-2 mb-2">Sitecore Documentation</a>
                </Link>
              </div>
              <div className="col-12 col-md-3">
                <Link href="/">
                  <a href="https://www.sitecore.com/request-a-demo" target="_blank" className="mt-2 mb-2">Request a Demo</a>
                </Link>
              </div>
              <div className="col-12 col-md-3">
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
