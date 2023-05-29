import { JSONContent } from "@tiptap/core";
import { AuthorResults } from "./author-type";
import { RepositoryResults } from "./repository-type";

type Blog = {
  id: string;
  lastUpdateDate: string;
  title: string;
  summary: string;
  body: JSONContent;
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
