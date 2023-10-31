import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Four0four() {
  return (
    <Layout>
      <Head>
        <title>Sitecore Demo Blog - This is not the page you are looking for...</title>
      </Head>
      <div className="not-found">
        <div className="container not-found-container">
          <Link href="/" className="arrow-btn">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Blog
          </Link>
          <h1>
            Oops!
            <br />
            You&apos;ve wandered off the digital path.
          </h1>
          <h1 className="not-found-404">404</h1>
        </div>
        <Image
          src="/assets/blog/shared/404-illustration.svg"
          width={944}
          height={633}
          alt={'404'}
        />
      </div>
    </Layout>
  );
}
