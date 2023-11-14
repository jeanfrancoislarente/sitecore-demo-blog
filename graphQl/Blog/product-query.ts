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
  productGroup {
    results {
      id
    }
  }
`;

export const PRODUCTS_QUERY = `{
  data: products (id: "A7QLG1aiQEmXM7HaIe2y1w") {
    name
    description
    products (first: 20) {
      results {
        ... on Product {
          ${PRODUCT_QUERY}
        }
      }
    }
  }
}
`;

export default PRODUCT_QUERY;
