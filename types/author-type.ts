import { MediaResults } from './Common/media-type';

type Author = {
  id: string;
  authorName: string;
  profilePhoto: MediaResults;
  profileBackground: MediaResults;
  jobTitle: string;
  bio: string;
};

export default Author;

export type AuthorResults = {
  results: Author[];
};

export type Authors = {
  name: string;
  description: string;
  authors: Author[];
};
