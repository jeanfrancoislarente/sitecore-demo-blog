import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getAllNonFeaturedPosts, getAllFeaturedPosts } from '../lib/api'
import Head from 'next/head'
import { BLOG_NAME } from '../lib/constants'
import { pageview } from '../lib/gtag'

export default function Index({ heroPosts, morePosts }) {
  pageview('Home')

  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <Container>
          {heroPosts && heroPosts.length > 0 && heroPosts.map(heroPost => (
            <HeroPost
              title={heroPost.title}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              key={heroPost.slug}
              primaryTopic={heroPost.primaryTopic}
            />
          ))}
          {morePosts && morePosts.length > 0 && (
            <MoreStories
              posts={morePosts}
              title="More Stories"
            />
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const featuredPosts = getAllFeaturedPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'featuredOrder',
    'primaryTopic',
  ])
  const nonFeaturedPosts = getAllNonFeaturedPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'featuredOrder',
    'primaryTopic',
  ])

  let heroPosts, morePosts
  if (featuredPosts.length > 0) {
    heroPosts = featuredPosts;
    morePosts = nonFeaturedPosts
  } else {
    [heroPosts, ...morePosts] = nonFeaturedPosts
  }

  return {
    props: {
      heroPosts,
      morePosts
    },
  }
}
