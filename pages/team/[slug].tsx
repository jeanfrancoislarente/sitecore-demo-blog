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
import PageHeader from '../../components/PageHeader';
import AuthorProfilePhoto from '../../components/AuthorProfilePhoto';
import AuthorSocials from '../../components/AuthorSocials';

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
  const allAuthors = await getAllAuthors();

  return {
    paths: allAuthors.authors.map((author) => {
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

  const headerDescription = (
    <>
      {author.bio}
      <AuthorSocials linkedin="#" twitter="#" />
    </>
  );

  return (
    <Layout>
      <Head>
        <title>{`${author.authorName} | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader
        title={author.authorName}
        subtitle={author.jobTitle}
        description={headerDescription}
        className="author-header"
      >
        {author.profilePhoto && (
          <AuthorProfilePhoto
            photo={author.profilePhoto.results[0]}
            background={author.profileBackground.results[0]}
            name={author.authorName}
            largeVariant
          />
        )}
      </PageHeader>
      {posts && posts.length > 0 && <MoreStories posts={posts} title="Related posts" />}
    </Layout>
  );
}
