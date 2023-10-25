import Container from "../components/Container";
import RepositoryPreview from "../components/RepositoryPreview";
import PageTitle from "../components/PageTitle";
import Layout from "../components/Layout";
import Head from "next/head";
import { BLOG_NAME } from "../lib/constants";
import { getAllRepositories } from "../lib/Blog/repository-lib";
import Repository from "../types/repository-type";

export async function getStaticProps() {
  const repositories = await getAllRepositories();

  return {
    props: {
      repositories,
    },
  };
}

type RepositoriesPageProps = {
  repositories: Repository[];
};

export default function RepositoriesPage({ repositories }: RepositoriesPageProps) {
  return (
    <Layout>
      <Head>
        <title>{`Our Repositories | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <PageTitle>Our Repositories</PageTitle>
        {repositories.map((repository) => (
          <RepositoryPreview
            key={repository.id}
            title={repository.name}
            slug={repository.id}
            excerpt={repository.summary}
          />
        ))}
      </Container>
    </Layout>
  );
}
