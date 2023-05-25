import Container from "../components/Container";
import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";

export default function Error() {
  return (
    <Layout>
      <Head>
        <title>Sitecore Demo Blog - Sorry about the mess...</title>
      </Head>
      <Container>
        <h1>Oops!</h1>
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
        <p>
          <Link href="/">
            Please click here and go back to the home page if that&apos;s even
            possible at this moment.
          </Link>
        </p>
      </Container>
    </Layout>
  );
}
