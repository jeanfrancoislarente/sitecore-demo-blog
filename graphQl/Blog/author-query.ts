import MEDIA_QUERY from "../Common/media-query";

export const AUTHOR_QUERY = `
  id
  authorName
  authorFace {
    results{
      ${MEDIA_QUERY}
    }
  }
  jobTitle
`;

export const ALL_AUTHOR_QUERY = `{
  data: allAuthor
  {
    results {
      ${AUTHOR_QUERY}
    }
  }
}
`;
