import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Blog from '../../types/blog-type';
import { getBlogById, getAllBlogs } from '../../lib/Blog/blog-lib';
import Head from 'next/head';
import { richTextProfile } from '../../lib/Common/richTextConfiguration';
import { generateHTML } from '@tiptap/html';
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import { BLOG_NAME } from '../../lib/constants';
import PostHeader from '../../components/PostHeader';
import PostBody from '../../components/PostBody';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const blog = await getBlogById(params.slug);

  return {
    props: {
      blog,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

export async function getStaticPaths() {
  const allBlogs = await getAllBlogs();

  return {
    paths: allBlogs.map(({ id }) => `/posts/${id}`) ?? [],
    fallback: 'blocking',
  };
}

type Props = {
  blog: Blog;
};

const Post = ({ blog }: Props) => {
  const router = useRouter();

  if (!blog || (!router.isFallback && !blog?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  const content = `${blog?.body ? generateHTML(blog.body, [richTextProfile]) : ''}${
    blog?.content?.results
      ? blog.content.results
          .map(
            (contentSection) => `${
              !!contentSection.text ? generateHTML(contentSection.text, [richTextProfile]) : ''
            }
          ${
            !!contentSection.images
              ? contentSection.images.results
                  .map((image) => `<p><img src="${image.fileUrl}" /></p>`)
                  .join('')
              : ''
          }${!!contentSection.text2 ? generateHTML(contentSection.text2, [richTextProfile]) : ''}`
          )
          .join('')
      : ''
  }`;

  return (
    <Layout>
      <Head>
        <title>{`${blog.title} | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <article>
          <PostHeader title={blog.title} primaryTopic={blog.primaryTopic} />
          <PostBody
            body={content}
            date={blog.issueDate}
            author={blog.author.results[0]}
            repositories={blog.repositories.results}
          />
        </article>
      </Container>
    </Layout>
  );
};
export default Post;
