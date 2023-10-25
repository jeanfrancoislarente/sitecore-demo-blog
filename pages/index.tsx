import Head from 'next/head';
import { getAllFeaturedBlogs, getAllNonFeaturedBlogs } from '../lib/Blog/blog-lib';
import Blog from '../types/blog-type';
import { BLOG_NAME } from '../lib/constants';
import Layout from '../components/Layout';
import Container from '../components/Container';
import MoreStories from '../components/MoreStories';
import HeroPost from '../components/HeroPost';

export async function getStaticProps() {
  const [allFeaturedBlogs, allNonFeaturedBlogs] = await Promise.all([
    getAllFeaturedBlogs(),
    getAllNonFeaturedBlogs(),
  ]);
  return {
    props: { allFeaturedBlogs, allNonFeaturedBlogs },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

type Props = {
  allFeaturedBlogs: Blog[];
  allNonFeaturedBlogs: Blog[];
};

const Homepage = ({ allFeaturedBlogs, allNonFeaturedBlogs }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <Container>
        {allFeaturedBlogs &&
          allFeaturedBlogs.length > 0 &&
          allFeaturedBlogs.map((heroPost) => <HeroPost key={heroPost.id} {...heroPost} />)}
        {allNonFeaturedBlogs && allNonFeaturedBlogs.length > 0 && (
          <MoreStories posts={allNonFeaturedBlogs} title="More Stories" />
        )}
      </Container>
    </Layout>
  );
};

export default Homepage;
