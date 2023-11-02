import MEDIA_QUERY from '../Common/media-query';

export const PRODUCT_QUERY = `
  id
  name
  logo {
    results{
      ${MEDIA_QUERY}
    }
  }
  description
  getDemoLink
  exploreProductLink
`;

// TODO: Do the same but for Products
// export const REPOSITORIES_QUERY = `{
//   data: repositories (id: "-zEfrwok5kGxyf7g504yYw") {
//     repositories {
//       results {
//         ... on Repository {
//           ${REPOSITORY_QUERY}
//         }
//       }
//     }
//   }
// }
// `;

export default PRODUCT_QUERY;
