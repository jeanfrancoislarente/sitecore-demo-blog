import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../components/Container";
import MoreStories from "../../components/MoreStories";
import Layout from "../../components/Layout";
import { BLOG_NAME } from "../../lib/constants";
import Blog from "../../types/blog-type";
import { getBlogsByAuthor } from "../../lib/Blog/blog-lib";
import { getAllAuthors, getAuthorById } from "../../lib/Blog/author-lib";
import Author from "../../types/author-type";
import Image from "next/image";

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
      author: {
        ...author,
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
  const authors = await getAllAuthors();

  return {
    paths: authors.map((author) => {
      return {
        params: {
          slug: author.id,
        },
      };
    }),
    fallback: "blocking",
  };
}

type Props = {
  author: Author;
  posts: Blog[];
};

export default function RepositoryPage({ author, posts }: Props) {
  const router = useRouter();

  if (!author || (!router.isFallback && !author?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{`${author.authorName} | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <article className="mb-32 w-full">
          <div className="flex flex-col items-start gap-4 mb-12 md:flex-row">
            {author.authorFace && (
              <Image
                src={author.authorFace.results[0].fileUrl}
                width={100}
                height={100}
                className="rounded-full mr-4 w-28 h-28 object-cover shrink-0"
                alt={author.authorName}
              />
            )}
            <div className="w-full">
              <h2 className="text-3xl leading-snug">{author.authorName}</h2>
              <h5 className="bg-[#dfdfdf] px-2 py-1">{author.jobTitle}</h5>
              <p className="mt-4">{author.bio}</p>
            </div>
          </div>
        </article>
        {posts && posts.length > 0 && <MoreStories posts={posts} title="Related posts" />}
      </Container>
    </Layout>
  );
}
