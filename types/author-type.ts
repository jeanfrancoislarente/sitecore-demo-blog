import { MediaResults } from "./Common/media-type";

type Author = {
  id: string;
  authorName: string;
  authorFace: MediaResults;
  jobTitle: string;
  bio: string;
};

export default Author;

export type AuthorResults = {
  results: Author[];
};
