import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Layout from '../components/Layout';
import { BLOG_NAME } from '../lib/constants';
import { getContentPageById } from '../lib/Blog/content-page-lib';
import ContentPage from '../types/content-page-type';
import PageHeader from '../components/PageHeader';
import ContentPageContent from '../components/ContentPageContent';

export async function getStaticProps() {
  const contactPage = await getContentPageById('-L6ZTbIGdEOpFYapcgwcqA');

  return {
    props: {
      contactPage,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

type Props = {
  contactPage: ContentPage;
};

export default function ContactPage({ contactPage }: Props) {
  const router = useRouter();

  if (!contactPage || (!router.isFallback && !contactPage?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{`${contactPage.title} | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={contactPage.title} description={contactPage.summary} />
      <ContentPageContent page={contactPage} />
    </Layout>
  );
}
