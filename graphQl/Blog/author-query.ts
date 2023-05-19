import MEDIA_QUERY from "../Common/media-query";

export const AUTHOR_QUERY = `
  id
  authorName
  authorFace {
    results{
      ${MEDIA_QUERY}
    }
  }
`;

export const ALL_AUTHOR_QUERY = `{
  data: allAuthor
  {
    __typename
    total
    results {
      ${AUTHOR_QUERY}
    }
  }
}
`;

export default ALL_AUTHOR_QUERY;
