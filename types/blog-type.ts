import { JSONContent } from "@tiptap/core";
import { AuthorResults } from "./author-type";
import { RepositoryResults } from "./repository-type";
import { MediaResults } from "./Common/media-type";

export type TextContent = {
  text: JSONContent;
};

export type ImagesContent = {
  images: MediaResults;
};

export type Content = {
  results: (TextContent | ImagesContent)[];
};

type Blog = {
  id: string;
  lastUpdateDate: string;
  title: string;
  summary: string;
  body: JSONContent;
  content: Content;
  issueDate: string;
  author: AuthorResults;
  isFeatured: boolean;
  primaryTopic: string;
  repositories: RepositoryResults;
};

export default Blog;

export type BlogResults = {
  results: Blog[];
};
