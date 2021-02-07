import Container from '../components/container'
import TeamMemberPreview from '../components/team-member-preview'
import PageTitle from '../components/page-title'
import Layout from '../components/layout'
import { getAllTeamMembers } from '../lib/teamService'
import Head from 'next/head'
import { BLOG_NAME } from '../lib/constants'

export default function Team({ allTeamMembers }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Our Team | { BLOG_NAME }</title>
        </Head>
        <Container>
          <PageTitle>Our Team</PageTitle>
          {allTeamMembers.map(teamMember => (
            <TeamMemberPreview
              key={teamMember.slug}
              slug={teamMember.slug}
              name={teamMember.name}
              picture={teamMember.picture}
              role={teamMember.role}
            />
          ))}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allTeamMembers = getAllTeamMembers([
    'slug',
    'name',
    'picture',
    'role',
    'order'
  ])

  return {
    props: { allTeamMembers },
  }
}
