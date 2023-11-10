import Repository, { Repositories } from '../../types/repository-type';
import { fetchAPI } from '../Common/api';
import { REPOSITORY_QUERY, REPOSITORIES_QUERY } from '../../graphQl/Blog/repository-query';

export async function getAllRepositories(): Promise<Repositories> {
  const data = await fetchAPI(`${REPOSITORIES_QUERY}`);
  return {
    name: data.data.data.name,
    description: data.data.data.description,
    repositories: data.data.data.repositories.results,
  };
}

export async function getRepositoryById(id: string): Promise<Repository> {
  const repositoryQuery = `{
    data: repository (id: "${id}")
    {
      ${REPOSITORY_QUERY}
    }
  }`;

  const data = await fetchAPI(repositoryQuery);
  return data.data.data;
}
