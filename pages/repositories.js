import Container from '../components/container'
import RepositoryPreview from '../components/repository-preview'
import PageTitle from '../components/page-title'
import Layout from '../components/layout'
import { getAllRepositories } from '../lib/api'
import Head from 'next/head'

export default function Repositories({ allRepositories }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Our Repositories</title>
        </Head>
        <Container>
          <PageTitle>Our Repositories.</PageTitle>
          {allRepositories.map(repository => (
            <RepositoryPreview
              key={repository.slug}
              title={repository.title}
              url={repository.url}
              excerpt={repository.excerpt}
              slug={repository.slug}
            />
          ))}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allRepositories = getAllRepositories([
    'title',
    'url',
    'excerpt',
    'slug',
    'order'
  ])

  return {
    props: { allRepositories },
  }
}
