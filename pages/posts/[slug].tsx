import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Blog from '../../types/blog-type';
import {
  getBlogById,
  getAllBlogs,
  getBlogsByProduct,
  getBlogsByRepository,
} from '../../lib/Blog/blog-lib';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { BLOG_NAME } from '../../lib/constants';
import PostHeader from '../../components/PostHeader';
import PostBody from '../../components/PostBody';
import PostSuggestions, { RelatedEntity } from '../../components/PostSuggestions';
import {
  addHrefToItems,
  createRelatedEntity,
  fetchRelatedPosts,
} from '../../helpers/relatedEntitiesHelper';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const blog = await getBlogById(params.slug);

  const relatedProducts = addHrefToItems(blog.products.results, 'products');
  const relatedRepos = addHrefToItems(blog.repositories.results, 'repositories');

  const productRelatedPosts = await fetchRelatedPosts(relatedProducts, getBlogsByProduct);
  const repoRelatedPosts = await fetchRelatedPosts(relatedRepos, getBlogsByRepository);

  const relatedEntities = [
    ...relatedProducts.map((product, i) =>
      createRelatedEntity(product, 'products', productRelatedPosts[i], params.slug)
    ),
    ...relatedRepos.map((repo, i) =>
      createRelatedEntity(repo, 'repositories', repoRelatedPosts[i], params.slug)
    ),
  ];

  return {
    props: {
      blog,
      relatedEntities,
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
  relatedEntities: RelatedEntity[];
};

const Post = ({ blog, relatedEntities }: Props) => {
  const router = useRouter();

  if (!blog || (!router.isFallback && !blog?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{`${blog.title} | ${BLOG_NAME}`}</title>
      </Head>
      <article className="container">
        <PostHeader title={blog.title} summary={blog.summary} date={blog.issueDate} />
        <PostBody blog={blog} />

        {relatedEntities.length > 0 && (
          <>
            <hr />
            <PostSuggestions relatedEntities={relatedEntities} />
          </>
        )}
      </article>
    </Layout>
  );
};
export default Post;
