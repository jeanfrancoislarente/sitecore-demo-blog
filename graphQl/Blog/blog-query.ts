import { AUTHOR_QUERY } from "./author-query";

export const BLOG_QUERY = `
  id
  title
  summary
  body
  issueDate
  author {
    results {
      ... on Author {
        ${AUTHOR_QUERY}
      }
    }
  }
  isFeatured
  primaryTopic
`;

export const ALL_BLOG_QUERY = `{
  data: allSampleArticle
  {
    __typename
    total
    results {
      ${BLOG_QUERY}
    }
  }
}
`;

export const ALL_FEATURED_BLOG_QUERY = `{
  data: allSampleArticle (where: {isFeatured_eq: true })
  {
    __typename
    total
    results {
      ${BLOG_QUERY}
    }
  }
}
`;

export const ALL_NON_FEATURED_BLOG_QUERY = `{
  data: allSampleArticle (where: {isFeatured_neq: true })
  {
    __typename
    total
    results {
      ${BLOG_QUERY}
    }
  }
}
`;

export default ALL_BLOG_QUERY;
