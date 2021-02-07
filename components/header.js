import Container from './container'
import Link from 'next/link'
import {BLOG_NAME} from '../lib/constants'

export default function Header() {
  return (
    <header>
      <Container>
        <nav className="navbar navbar-expand mb-6 sm:mb-10" style={{flexWrap:'wrap'}}>
            <Link href="/">
              <a className="mt-2 mb-2">
                <img src="/assets/blog/shared/site-title-web.png" alt={BLOG_NAME} className="site-title-image" />
              </a>
            </Link>
            <div className="navbar-nav ms-auto mb-2 sm:mb-0">
                <Link href={`/repositories`}>
                  <a className="nav-item nav-link">Our Repositories</a>
                </Link>
                <Link href={`/team`}>
                  <a className="nav-item nav-link">Our Team</a>
                </Link>
            </div>
        </nav>
      </Container>
    </header>
  )
}
