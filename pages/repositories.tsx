import Layout from '../components/Layout';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import { getAllRepositories } from '../lib/Blog/repository-lib';
import Repository from '../types/repository-type';
import PageHeader from '../components/PageHeader';
import RepositoryGrid from '../components/RepositoryGrid';

export async function getStaticProps() {
  const repositories = await getAllRepositories();

  return {
    props: {
      ...repositories,
    },
  };
}

type RepositoriesPageProps = {
  repositories: Repository[];
  description: string;
};

export default function RepositoriesPage({ repositories, description }: RepositoriesPageProps) {
  return (
    <Layout>
      <Head>
        <title>{`Our Repositories | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title="Our Repositories" description={description} />
      <RepositoryGrid repositories={repositories} />
    </Layout>
  );
}
