import Container from '../components/container'
import RepositoryPreview from '../components/repository-preview'
import PageTitle from '../components/page-title'
import Layout from '../components/layout'
import { getAllRepositories } from '../lib/api'
import Head from 'next/head'

export default function Repositories({ allRepos }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Our Repositories</title>
        </Head>
        <Container>
          <PageTitle>Our Repositories.</PageTitle>
          {allRepos.map(repo => <RepositoryPreview key={repo.title} title={repo.title} url={repo.url} excerpt={repo.excerpt} slug={repo.slug} />)}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allRepos = getAllRepositories([
    'title',
    'url',
    'excerpt',
    'slug',
    'order'
  ])

  return {
    props: { allRepos: allRepos },
  }
}
