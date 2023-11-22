import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';

export default function Error() {
  return (
    <Layout>
      <Head>
        <title>Sitecore Demo Blog - Sorry about the mess...</title>
      </Head>
      <section className="error">
        <div className="error-container">
          <Link href="/" className="arrow-btn text-violet">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Blog
          </Link>
          <h1>Oops!</h1>
          <div className="rich-text">
            <h3>There was an unforeseen error</h3>
            <p>
              Trust us, we will fix it.
              <ul>
                <li>The elephants are on the move.</li>
                <li>The Lions have been notified.</li>
                <li>The bugs are collecting the information.</li>
                <li>The monkeys have started typing.</li>
              </ul>
            </p>
          </div>
          <Image
            src="/assets/blog/shared/error-illustration.svg"
            width={600}
            height={400}
            alt={'error'}
            className="ml-auto mr-0"
          />
        </div>
      </section>
    </Layout>
  );
}
