import { JSONContent } from "@tiptap/core";
import { AuthorResults } from "./author-type";

type Blog = {
  id: string;
  title: string;
  summary: string;
  body: JSONContent;
  issueDate: string;
  author: AuthorResults;
  isFeatured: boolean;
  primaryTopic: string;
};

export default Blog;

export type BlogResults = {
  total: string;
  results: Blog[];
};
