import MEDIA_QUERY from '../Common/media-query';
import { AUTHOR_QUERY } from './author-query';
import { REPOSITORY_QUERY } from './repository-query';

export const BLOG_QUERY = `
  id
  lastUpdateDate: __sysUpdatedAt
  title
  summary
  body
  content (first: 100) {
    results {
      ... on BlogSection {
        text
        images {
          results {
            ${MEDIA_QUERY}
          }
        }
        text2
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

export const LISTING_BLOG_QUERY = `
  id
  lastUpdateDate: __sysUpdatedAt
  title
  summary
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
  data: allSampleArticle (orderBy: ISSUEDATE_DESC)
  {
    results {
      ${LISTING_BLOG_QUERY}
    }
  }
}
`;

export const ALL_FEATURED_BLOG_QUERY = `{
  data: allSampleArticle (where: {isFeatured_eq: true }, orderBy: ISSUEDATE_DESC)
  {
    results {
      ${LISTING_BLOG_QUERY}
    }
  }
}
`;

export const ALL_NON_FEATURED_BLOG_QUERY = `{
  data: allSampleArticle (where: {isFeatured_neq: true }, orderBy: ISSUEDATE_DESC)
  {
    results {
      ${LISTING_BLOG_QUERY}
    }
  }
}
`;

export default ALL_BLOG_QUERY;
