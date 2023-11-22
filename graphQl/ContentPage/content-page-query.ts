import MEDIA_QUERY from '../Common/media-query';

export const CONTENT_PAGE_QUERY = `
  id
  name
  title
  summary
  content
  image {
    results{
      ${MEDIA_QUERY}
    }
  }
`;
