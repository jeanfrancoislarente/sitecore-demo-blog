import Container from './container'
import Link from 'next/link'
import { BLOG_NAME } from '../lib/constants'

export default function Header() {
  return (
    <header>
      <Container>
        <nav className="navbar">
          <div className="container-fluid pe-0 ps-0">
            <Link href="/">
              <a className="mt-2 mb-2">
                <img src="/assets/blog/shared/site-title-web.png" alt={BLOG_NAME} className="site-title-image" />
              </a>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 sm:mb-0">
              <li className="nav-item">
                <Link href={`/repositories`}>
                  <a className="nav-link text-xl">Our Repositories</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}
