import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import TeamMemberHeader from '../../components/team-member-header'
import TeamMemberBody from '../../components/team-member-body'
import MoreStories from '../../components/more-stories'
import Layout from '../../components/layout'
import { getTeamMemberBySlug, getAllTeamMembers } from '../../lib/teamService'
import { getPostsByTeamMember } from '../../lib/postsService'
import PageTitle from '../../components/page-title'
import Head from 'next/head'
import { BLOG_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function TeamMember({ teamMember, posts }) {
  const router = useRouter()
  if (!router.isFallback && !teamMember?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PageTitle>Loading…</PageTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{teamMember.name} | {BLOG_NAME}</title>
              </Head>
              <TeamMemberHeader
                name={teamMember.name}
                picture={teamMember.picture}
                role={teamMember.role}
                focusAreas={teamMember.focusAreas}
              />
              <TeamMemberBody content={teamMember.content} />
              {posts && posts.length > 0 && <MoreStories posts={posts} title={`Posts by ${teamMember.name}`} />}
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const teamMember = getTeamMemberBySlug(params.slug, [
    'name',
    'picture',
    'role',
    'focusAreas',
    'slug',
    'content'
  ])
  const content = await markdownToHtml(teamMember.content || '')

  const posts = getPostsByTeamMember(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: {
      teamMember: {
        ...teamMember,
        content,
      },
      posts,
    },
  }
}

export async function getStaticPaths() {
  const teamMembers = getAllTeamMembers(['slug'])

  return {
    paths: teamMembers.map((teamMember) => {
      return {
        params: {
          slug: teamMember.slug,
        },
      }
    }),
    fallback: false,
  }
}
