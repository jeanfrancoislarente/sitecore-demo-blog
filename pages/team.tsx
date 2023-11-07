import Layout from '../components/Layout';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import AuthorPreview from '../components/AuthorPreview';
import { getAllAuthors } from '../lib/Blog/author-lib';
import Author from '../types/author-type';
import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

export async function getStaticProps() {
  const authors = await getAllAuthors();

  return {
    props: {
      authors,
    },
  };
}

type TeamPageProps = {
  authors: Author[];
};

export default function TeamPage({ authors }: TeamPageProps) {
  const [sortedAuthors, setSortedAuthors] = useState<Author[]>(authors);

  const sortAuthorsByNames = useCallback((authors: Author[]) => {
    const names = ['J.F.', 'Scott', 'Alexander', 'Neli', 'Christos', 'Todor'];

    const matchingAuthors = names.reduce((result: Author[], name: string) => {
      const author = authors.find((author) => author.authorName.includes(name));
      if (author) {
        result.push(author);
      }
      return result;
    }, []);

    const remainingAuthors = authors.filter((author) => !matchingAuthors.includes(author));

    return [...matchingAuthors, ...remainingAuthors];
  }, []);

  useEffect(() => {
    setSortedAuthors(sortAuthorsByNames(authors));
  }, [authors, sortAuthorsByNames]);

  return (
    <Layout>
      <Head>
        <title>{`Our Team | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader
        title="Our Team"
        description="Our team members are versatile and can pretty much contribute in all areas, but there is always a natural focus area for each."
      />
      {sortedAuthors.map((author) => (
        <AuthorPreview
          key={author.id}
          name={author.authorName}
          photo={author.authorFace.results[0]}
          jobTitle={author.jobTitle}
          bio={author.bio}
          slug={author.id}
        />
      ))}
    </Layout>
  );
}
