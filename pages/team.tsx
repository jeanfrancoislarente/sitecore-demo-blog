import Layout from '../components/Layout';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import { getAllAuthors } from '../lib/Blog/author-lib';
import { Authors } from '../types/author-type';
import PageHeader from '../components/PageHeader';
import AuthorGrid from '../components/AuthorGrid';

export async function getStaticProps() {
  const { name, description, authors } = await getAllAuthors();

  return {
    props: {
      name,
      description,
      authors,
    },
  };
}

export default function TeamPage({ name, description, authors }: Authors) {
  return (
    <Layout>
      <Head>
        <title>{`Our Team | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={name || 'Our Team'} description={description} />
      <AuthorGrid authors={authors} />
    </Layout>
  );
}
