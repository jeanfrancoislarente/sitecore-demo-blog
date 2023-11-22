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
  linkedin
  twitter
`;

export const AUTHORS_QUERY = `{
  data: authors (id: "Yc63KHSVxUiq4ukX4fqIjw") {
    name
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
