import Container from './container'
import Link from 'next/link'
import {BLOG_NAME} from '../lib/constants'

export default function Header() {
  return (
    <header>
      <Container>
        <nav className="navbar navbar-expand-sm mb-10">
          <div className="container-fluid pe-0 ps-0">
            <Link className="" href="/">
              <a className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl whitespace-nowrap font-bold tracking-tight md:tracking-tighter leading-tight mt-2 mb-2 hover:underline">{BLOG_NAME}.</a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                <li className="nav-item">
                  <Link href={`/repositories`}>
                    <a className="nav-link">Our Repositories</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
