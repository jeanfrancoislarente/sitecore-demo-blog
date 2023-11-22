import Layout from '../components/Layout';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import { getAllRepositories } from '../lib/Blog/repository-lib';
import { Repositories } from '../types/repository-type';
import PageHeader from '../components/PageHeader';
import RepositoryGrid from '../components/RepositoryGrid';

export async function getStaticProps() {
  const { name, description, repositories } = await getAllRepositories();

  return {
    props: {
      name,
      description,
      repositories,
    },
  };
}

export default function RepositoriesPage({ name, repositories, description }: Repositories) {
  return (
    <Layout>
      <Head>
        <title>{`Our Repositories | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={name || 'Our Repositories'} description={description} />
      <RepositoryGrid repositories={repositories} />
    </Layout>
  );
}
