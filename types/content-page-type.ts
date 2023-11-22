import { JSONContent } from '@tiptap/core';
import { MediaResults } from './Common/media-type';

type ContentPage = {
  id: string;
  title: string;
  summary: string;
  content: JSONContent;
  image: MediaResults;
};

export default ContentPage;
