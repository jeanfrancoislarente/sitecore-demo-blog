import Author from "../../types/author-type";
import { fetchAPI } from "../Common/api";
import { ALL_AUTHOR_QUERY, AUTHOR_QUERY } from "../../graphQl/Blog/author-query";

export async function getAllAuthors(): Promise<Author[]> {
  const data = await fetchAPI(`${ALL_AUTHOR_QUERY}`);
  return data.data.data.results;
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
