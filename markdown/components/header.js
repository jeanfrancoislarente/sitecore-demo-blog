import Container from "./container";
import Link from "next/link";
import { BLOG_NAME } from "../lib/constants";

export default function Header() {
  return (
    <header>
      <Container>
        <nav className="navbar mb-6 sm:mb-10">
          <div className="container-fluid pe-0 ps-0">
            <Link href="/" className="mt-2 mb-2">
              <img
                src="/assets/blog/shared/site-title-web.png"
                alt={BLOG_NAME}
                className="site-title-image"
              />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 sm:mb-0">
              <li className="nav-item">
                <Link href={`/repositories`} className="nav-link text-xl">
                  Our Repositories
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}
