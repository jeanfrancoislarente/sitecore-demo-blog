import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import MoreStories from '../../components/MoreStories';
import Layout from '../../components/Layout';
import { BLOG_NAME } from '../../lib/constants';
import { getAllRepositories, getRepositoryById } from '../../lib/Blog/repository-lib';
import Repository from '../../types/repository-type';
import Blog from '../../types/blog-type';
import { getBlogsByRepository } from '../../lib/Blog/blog-lib';
import PageHeader from '../../components/PageHeader';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const [repo, posts] = await Promise.all([
    getRepositoryById(params.slug),
    getBlogsByRepository(params.slug),
  ]);

  return {
    props: {
      repo,
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

export async function getStaticPaths() {
  const allRepositories = await getAllRepositories();

  return {
    paths: allRepositories.repositories.map((repo) => {
      return {
        params: {
          slug: repo.id,
        },
      };
    }),
    fallback: 'blocking',
  };
}

type Props = {
  repo: Repository;
  posts: Blog[];
};

export default function RepositoryPage({ repo, posts }: Props) {
  const router = useRouter();

  if (!repo || (!router.isFallback && !repo?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{`${repo.name} | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={repo.name} description={repo.summary}>
        ***button***
      </PageHeader>
      {posts && posts.length > 0 && <MoreStories posts={posts} title="Related posts" />}
    </Layout>
  );
}
