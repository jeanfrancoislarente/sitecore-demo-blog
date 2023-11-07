import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import MoreStories from '../../components/MoreStories';
import Layout from '../../components/Layout';
import { BLOG_NAME } from '../../lib/constants';
import Blog from '../../types/blog-type';
import { getBlogsByAuthor } from '../../lib/Blog/blog-lib';
import { getAllAuthors, getAuthorById } from '../../lib/Blog/author-lib';
import Author from '../../types/author-type';
import Image from 'next/image';
import PageHeader from '../../components/PageHeader';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const [author, posts] = await Promise.all([
    getAuthorById(params.slug),
    getBlogsByAuthor(params.slug),
  ]);

  return {
    props: {
      author,
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

export async function getStaticPaths() {
  const authors = await getAllAuthors();

  return {
    paths: authors.map((author) => {
      return {
        params: {
          slug: author.id,
        },
      };
    }),
    fallback: 'blocking',
  };
}

type Props = {
  author: Author;
  posts: Blog[];
};

export default function AuthorPage({ author, posts }: Props) {
  const router = useRouter();

  if (!author || (!router.isFallback && !author?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{`${author.authorName} | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={author.authorName} subtitle={author.jobTitle} description={author.bio}>
        <div>
          {author.authorFace && (
            <Image
              src={author.authorFace.results[0].fileUrl}
              width={100}
              height={100}
              alt={author.authorName}
            />
          )}
        </div>
      </PageHeader>
      {posts && posts.length > 0 && <MoreStories posts={posts} title="Related posts" />}
    </Layout>
  );
}
