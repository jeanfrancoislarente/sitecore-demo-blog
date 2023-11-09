import Author, { Authors } from '../../types/author-type';
import { fetchAPI } from '../Common/api';
import { AUTHORS_QUERY, AUTHOR_QUERY } from '../../graphQl/Blog/author-query';

export async function getAllAuthors(): Promise<Authors> {
  const data = await fetchAPI(`${AUTHORS_QUERY}`);
  return {
    description: data.data.data.description,
    authors: data.data.data.authors.results,
  };
}

export async function getAuthorById(id: string): Promise<Author> {
  const authorQuery = `{
    data: author (id: "${id}")
    {
      ${AUTHOR_QUERY}
    }
  }`;

  const data = await fetchAPI(authorQuery);
  return data.data.data;
}
