import Container from '../markdown/components/container';
import Link from 'next/link';
import { BLOG_NAME } from '../markdown/lib/constants';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <Container>
        <nav className="navbar mb-6 sm:mb-10">
          <div className="container-fluid pe-0 ps-0">
            <Link href="/" className="mt-2 mb-2">
              <Image
                src="/assets/blog/shared/site-title-web.png"
                width={560}
                height={68}
                alt={BLOG_NAME}
                className="site-title-image"
              />
            </Link>
            <ul className="navbar-nav flex flex-row flex-wrap ms-auto gap-x-4">
              <li className="nav-item">
                <Link href={`/repositories`} className="nav-link text-xl">
                  Our Repositories
                </Link>
              </li>
              <li className="nav-item">
                <Link href={`/team`} className="nav-link text-xl">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}
