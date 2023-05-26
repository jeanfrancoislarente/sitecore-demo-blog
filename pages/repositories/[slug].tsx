import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../components/Container";
import RepositoryHeader from "../../components/RepositoryHeader";
import RepositoryBody from "../../components/RepositoryBody";
import MoreStories from "../../components/MoreStories";
import Layout from "../../components/Layout";
import { BLOG_NAME } from "../../lib/constants";
import {
  getAllRepositories,
  getRepositoryById,
} from "../../lib/Blog/repository-lib";
import Repository from "../../types/repository-type";
import { richTextProfile } from "../../lib/Common/richTextConfiguration";
import { generateHTML } from "@tiptap/html";
import Blog from "../../types/blog-type";
import { getBlogsByRepository } from "../../lib/Blog/blog-lib";

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
      repo: {
        ...repo,
      },
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

export async function getStaticPaths() {
  const repos = await getAllRepositories();

  return {
    paths: repos.map((repo) => {
      return {
        params: {
          slug: repo.id,
        },
      };
    }),
    fallback: "blocking",
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

  const body = generateHTML(repo?.body, [richTextProfile]);

  return (
    <Layout>
      <Head>
        <title>{`${repo.name} | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <article className="mb-32">
          <RepositoryHeader title={repo.name} url={repo.url} />
          <RepositoryBody content={body} />
          {posts && posts.length > 0 && (
            <MoreStories posts={posts} title="Related posts" />
          )}
        </article>
      </Container>
    </Layout>
  );
}