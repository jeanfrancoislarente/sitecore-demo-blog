import MEDIA_QUERY from '../Common/media-query';

export const AUTHOR_QUERY = `
  id
  authorName
  profilePhoto {
    results{
      ${MEDIA_QUERY}
    }
  }
  profileBackground {
    results{
      ${MEDIA_QUERY}
    }
  }
  jobTitle
  bio
`;

export const AUTHORS_QUERY = `{
  data: authors (id: "Yc63KHSVxUiq4ukX4fqIjw") {
    description
    authors {
      results {
        ... on Author {
          ${AUTHOR_QUERY}
        }
      }
    }
  }
}
`;
