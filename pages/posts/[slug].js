import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { BLOG_NAME, IS_PRODUCTION } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { GA_TRACKING_ID } from '../../lib/gtag'


export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
            <>
              <article className="mb-32">
                <Head>
                  <title>
                    {post.title} | {BLOG_NAME}
                  </title>
                  {/* Global Site Tag (gtag.js) - Google Analytics */}
                  {IS_PRODUCTION && (
                      <script
                        dangerouslySetInnerHTML={{
                          __html: `
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      page_type:  '${post.primaryTopic}',
                    });
                  `,
                        }}
                      />
                  )}
                </Head>
                <PostHeader
                  title={post.title}
                  primaryTopic={post.primaryTopic}
                />
                <PostBody
                  content={post.content}
                  date={post.date}
                  author={post.author}
                  repositories={post.repositories}
                />
              </article>
            </>
          )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'repositories',
    'primaryTopic',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
