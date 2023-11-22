export const REPOSITORY_QUERY = `
  id
  lastUpdateDate: __sysUpdatedAt
  name
  url
  summary
  body
`;

export const REPOSITORIES_QUERY = `{
  data: repositories (id: "-zEfrwok5kGxyf7g504yYw") {
    name
    description
    repositories {
      results {
        ... on Repository {
          ${REPOSITORY_QUERY}
        }
      }
    }
  }
}
`;
