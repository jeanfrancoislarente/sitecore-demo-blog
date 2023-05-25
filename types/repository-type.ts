import { JSONContent } from "@tiptap/core";

type Repository = {
  id: string;
  name: string;
  url: string;
  summary: string;
  body: JSONContent;
};

export default Repository;

export type RepositoryResults = {
  results: Repository[];
};
