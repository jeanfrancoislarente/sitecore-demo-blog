import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Blog, {
  Content,
  ImagesContent,
  TextContent,
} from "../../types/blog-type";
import { getBlogById, getAllBlogs } from "../../lib/Blog/blog-lib";
import Head from "next/head";
import { richTextProfile } from "../../lib/Common/richTextConfiguration";
import { generateHTML } from "@tiptap/html";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import { BLOG_NAME } from "../../lib/constants";
import PostHeader from "../../components/PostHeader";
import PostBody from "../../components/PostBody";

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const blog = await getBlogById(params.slug);

  return {
    props: { blog: blog },
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
    fallback: "blocking",
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

  const body = blog?.body ? generateHTML(blog.body, [richTextProfile]) : "";

  const content = blog?.content?.results
    ? blog.content.results
        .map((contentSection) => {
          if ("text" in contentSection) {
            const textContent = contentSection as TextContent;
            return textContent?.text
              ? generateHTML(textContent.text, [richTextProfile])
              : "";
          } else {
            const imagesContent = contentSection as ImagesContent;
            return imagesContent?.images?.results
              ? imagesContent.images.results
                  .map((image) => `<p><img src="${image.fileUrl}" /></p>`)
                  .join("")
              : "";
          }
        })
        .join("")
    : "";

  return (
    <Layout>
      <Head>
        <title>{`${blog.title} | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <article className="mb-32">
          <PostHeader title={blog.title} primaryTopic={blog.primaryTopic} />
          <PostBody
            body={content || body}
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
