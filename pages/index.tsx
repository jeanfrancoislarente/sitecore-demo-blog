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
    props: { featuredBlogs: [featuredBlogs[0]], nonFeaturedBlogs },
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
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      {featuredBlogs && featuredBlogs.length > 0 && <PostHeroSlider posts={featuredBlogs} />}
      {nonFeaturedBlogs && nonFeaturedBlogs.length > 0 && (
        <MoreStories posts={nonFeaturedBlogs} title="More Articles" />
      )}
    </Layout>
  );
};

export default Homepage;
