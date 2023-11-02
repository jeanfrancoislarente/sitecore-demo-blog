import Head from 'next/head';
import { getAllFeaturedBlogs, getAllNonFeaturedBlogs } from '../lib/Blog/blog-lib';
import Blog from '../types/blog-type';
import { BLOG_NAME } from '../lib/constants';
import Layout from '../components/Layout';
import MoreStories from '../components/MoreStories';
import PostHeroSlider from '../components/PostHeroSlider';

export async function getStaticProps() {
  const [featuredBlogs, nonFeaturedBlogs] = await Promise.all([
    getAllFeaturedBlogs(),
    getAllNonFeaturedBlogs(),
  ]);
  return {
    props: { featuredBlogs, nonFeaturedBlogs },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

type Props = {
  featuredBlogs: Blog[];
  nonFeaturedBlogs: Blog[];
};

const Homepage = ({ featuredBlogs, nonFeaturedBlogs }: Props) => {
  const hasFeaturedBlogs = featuredBlogs && featuredBlogs.length > 0;
  const hasNonFeaturedBlogs = nonFeaturedBlogs && nonFeaturedBlogs.length > 0;

  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      {hasFeaturedBlogs && <PostHeroSlider posts={featuredBlogs} />}
      {hasNonFeaturedBlogs && <MoreStories posts={nonFeaturedBlogs} title="More Articles" />}
    </Layout>
  );
};

export default Homepage;
