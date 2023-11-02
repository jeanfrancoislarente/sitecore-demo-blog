import { JSONContent } from '@tiptap/core';
import { AuthorResults } from './author-type';
import { RepositoryResults } from './repository-type';
import { MediaResults } from './Common/media-type';
import { ProductResults } from './product-type';

export type TextContent = {
  text: JSONContent;
};

export type ImagesContent = {
  images: MediaResults;
};

export type SectionContent = {
  text: JSONContent;
  images: MediaResults;
  text2: JSONContent;
};

export type Content = {
  results: SectionContent[];
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
  products: ProductResults;
};

export default Blog;

export type BlogResults = {
  results: Blog[];
};
