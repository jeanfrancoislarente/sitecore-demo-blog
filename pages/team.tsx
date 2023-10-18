import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Layout from "../components/Layout";
import Head from "next/head";
import { BLOG_NAME } from "../lib/constants";
import AuthorPreview from "../components/AuthorPreview";
import { getAllAuthors } from "../lib/Blog/author-lib";
import Author from "../types/author-type";

export async function getStaticProps() {
  const allAuthors = await getAllAuthors();

  return {
    props: { authors: allAuthors },
  };
}

type TeamPageProps = {
  authors: Author[];
};

export default function TeamPage({ authors }: TeamPageProps) {
  return (
    <Layout>
      <Head>
        <title>{`Our Team | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <PageTitle>Our Team</PageTitle>
        {authors.map((author) => (
          <AuthorPreview
            key={author.id}
            name={author.authorName}
            photo={author.authorFace.results[0]}
            jobTitle={author.jobTitle}
          />
        ))}
      </Container>
    </Layout>
  );
}
