export const REPOSITORY_QUERY = `
  id
  name
  url
  summary
  body
`;

export const REPOSITORIES_QUERY = `{
  data: repositories (id: "-zEfrwok5kGxyf7g504yYw") {
    repositories {
      total
      results {
        ... on Repository {
          ${REPOSITORY_QUERY}
        }
      }
    }
  }
}
`;

export default REPOSITORIES_QUERY;
