import Link from 'next/link';
import { BLOG_NAME } from '../lib/constants';
import Image from 'next/image';
import { faBars, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav>
        <div className="container header-container">
          <Link href="/" className="header-logo">
            <Image
              src="/assets/blog/shared/site-title-web.png"
              width={330}
              height={40}
              alt={BLOG_NAME}
            />
          </Link>
          <button className="header-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="header-button" onClick={() => setMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className={`header-menu ${menuOpen ? 'visible' : ''}`}>
          <div className="container header-menu-container">
            <button className="header-button">
              <FontAwesomeIcon icon={faClose} onClick={() => setMenuOpen(false)} />
            </button>
            <ul>
              <li className={router.pathname == '/' ? 'active' : ''}>
                <Link href={`/`}>Blog</Link>
              </li>
              <li className={router.pathname.startsWith('/products') ? 'active' : ''}>
                <Link href={`/products`}>Products</Link>
              </li>
              <li className={router.pathname.startsWith('/repositories') ? 'active' : ''}>
                <Link href={`/repositories`}>Repositories</Link>
              </li>
              <li className={router.pathname.startsWith('/team') ? 'active' : ''}>
                <Link href={`/team`}>Team</Link>
              </li>
              <li className={router.pathname.startsWith('/contact') ? 'active' : ''}>
                <Link href={`/contact`}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
