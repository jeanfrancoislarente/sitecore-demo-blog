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
      <section className="container relative h-full">
        <Link href="/" className="arrow-btn text-violet">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Blog
        </Link>
        <h1>Oops!</h1>
        <h3>There was an unforeseen error</h3>
        <p className="leading-loose">
          Trust us, we will fix it.
          <ul className="list-disc ml-8">
            <li>The elephants are on the move.</li>
            <li>The Lions have been notified.</li>
            <li>The bugs are collecting the information.</li>
            <li>The monkeys have started typing.</li>
          </ul>
        </p>
        <Image
          src="/assets/blog/shared/error-illustration.svg"
          width={600}
          height={400}
          alt={'error'}
          className="mt-12 ml-auto mr-0"
        />
      </section>
    </Layout>
  );
}
