import Container from '../markdown/components/container';
import Link from 'next/link';
import { BLOG_NAME } from '../markdown/lib/constants';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/assets/blog/shared/site-title-web.png"
                width={560}
                height={68}
                alt={BLOG_NAME}
              />
            </Link>
            <ul>
              <li>
                <Link href={`/repositories`}>Our Repositories</Link>
              </li>
              <li>
                <Link href={`/team`}>Our Team</Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}
