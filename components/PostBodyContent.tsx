import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import CodeBlock from './CodeBlock';
import Blog from '../types/blog-type';
import { generateHTML } from '@tiptap/html';
import { richTextProfile } from '../lib/Common/richTextConfiguration';

type PostBodyContentProps = {
  blog: Blog;
};

interface NodeWithChildrenAndData extends Element {
  data: string;
  children: NodeWithChildrenAndData[];
}

export default function PostBodyContent({ blog }: PostBodyContentProps) {
  const body = `${blog?.body ? generateHTML(blog.body, [richTextProfile]) : ''}${
    blog?.content?.results
      ? blog.content.results
          .map(
            (contentSection) => `${
              !!contentSection.text ? generateHTML(contentSection.text, [richTextProfile]) : ''
            }
          ${
            !!contentSection.images
              ? contentSection.images.results
                  .map((image) => `<p><img src="${image.fileUrl}" /></p>`)
                  .join('')
              : ''
          }${!!contentSection.text2 ? generateHTML(contentSection.text2, [richTextProfile]) : ''}`
          )
          .join('')
      : ''
  }`;

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs && domNode.tagName === 'pre') {
        const preNode = domNode as NodeWithChildrenAndData;
        const codeNode = preNode.childNodes[0] as NodeWithChildrenAndData;

        return <CodeBlock code={codeNode.children[0].data} language={codeNode.attribs.class} />;
      }
    },
  };

  return <div className="post-body-content">{parse(body, options)}</div>;
}
