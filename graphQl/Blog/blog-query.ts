import MEDIA_QUERY from "../Common/media-query";
import { AUTHOR_QUERY } from "./author-query";
import { REPOSITORY_QUERY } from "./repository-query";

export const BLOG_QUERY = `
  id
  lastUpdateDate: __sysUpdatedAt
  title
  summary
  body
  content {
    results {
      ... on BlogTextSection {
        text
      }
      ... on BlogImagesSection {
        images {
          results {
            ${MEDIA_QUERY}
          }
        }
      }
    }
  }
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
  repositories {
    results {
      ... on Repository {
        ${REPOSITORY_QUERY}
      }
    }
  }
`;

export const ALL_BLOG_QUERY = `{
  data: allSampleArticle
  {
    results {
      ${BLOG_QUERY}
    }
  }
}
`;

export const ALL_FEATURED_BLOG_QUERY = `{
  data: allSampleArticle (where: {isFeatured_eq: true })
  {
    results {
      ${BLOG_QUERY}
    }
  }
}
`;

export const ALL_NON_FEATURED_BLOG_QUERY = `{
  data: allSampleArticle (where: {isFeatured_neq: true })
  {
    results {
      ${BLOG_QUERY}
    }
  }
}
`;

export default ALL_BLOG_QUERY;
