import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Container from '../../components/container'
import RepositoryHeader from '../../components/repository-header'
import RepositoryBody from '../../components/repository-body'
import MoreStories from '../../components/more-stories'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import { getRepositoryBySlug, getAllRepositories, getPostsByRepository } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import { BLOG_NAME } from '../../lib/constants'
import { pageview } from '../../lib/gtag'

export default function Repository({ repo, posts }) {
  const router = useRouter()
  if (!router.isFallback && !repo?.slug) {
    return <ErrorPage statusCode={404} />
  }

  pageview('Repository')

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PageTitle>Loading…</PageTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{repo.title} | {BLOG_NAME}</title>
              </Head>
              <RepositoryHeader
                title={repo.title}
                url={repo.url}
              />
              <RepositoryBody content={repo.content} />
              {posts && posts.length > 0 && <MoreStories posts={posts} title="Related posts" />}
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const repo = getRepositoryBySlug(params.slug, [
    'title',
    'url',
    'slug',
    'content'
  ])
  const content = await markdownToHtml(repo.content || '')

  const posts = getPostsByRepository(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'repositories',
    'primaryTopic'
  ])

  return {
    props: {
      repo: {
        ...repo,
        content,
      },
      posts,
    },
  }
}

export async function getStaticPaths() {
  const repos = getAllRepositories(['slug'])

  return {
    paths: repos.map((repo) => {
      return {
        params: {
          slug: repo.slug,
        },
      }
    }),
    fallback: false,
  }
}
