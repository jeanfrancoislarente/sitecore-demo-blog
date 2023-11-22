import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { generateHTML } from '@tiptap/html';
import { richTextProfile } from '../lib/Common/richTextConfiguration';
import { JSONContent } from '@tiptap/react';
import CodeBlock from './CodeBlock';
import { SectionContent } from '../types/blog-type';
import { useMemo } from 'react';
import { Media } from '../types/Common/media-type';
import PostBodyImage from './PostBodyImage';

type RichTextProps = {
  content: JSONContent;
  sections?: SectionContent[];
  imageClickHandler?: (i: number) => void;
  className?: string;
};

interface NodeWithChildrenAndData extends Element {
  data: string;
  children: NodeWithChildrenAndData[];
}

export default function RichText({
  content,
  sections,
  imageClickHandler,
  className,
}: RichTextProps) {
  const images: Media[] = useMemo(() => [], []);

  const options: HTMLReactParserOptions = useMemo(() => {
    return {
      replace(domNode) {
        if (domNode instanceof Element && domNode.attribs) {
          if (domNode.tagName === 'pre') {
            const preNode = domNode as NodeWithChildrenAndData;
            const codeNode = preNode.childNodes[0] as NodeWithChildrenAndData;

            return <CodeBlock code={codeNode.children[0].data} language={codeNode.attribs.class} />;
          }

          if (domNode.tagName === 'img' && !!imageClickHandler) {
            const image = images.find((img) => img.fileUrl === domNode.attribs.src);
            const index = images.findIndex((img) => img.fileUrl === domNode.attribs.src);

            return (
              image && <PostBodyImage image={image} index={index} onClick={imageClickHandler} />
            );
          }
        }
      },
    };
  }, [imageClickHandler, images]);

  const sectionsHtml = useMemo(
    () =>
      sections && sections.length > 0
        ? `${sections
            .map(
              (section) => `${!!section.text ? generateHTML(section.text, [richTextProfile]) : ''}
          ${
            !!section.images
              ? section.images.results
                  .map((image) => {
                    images.push(image);
                    return `<p><img src="${image.fileUrl}" /></p>`;
                  })
                  .join('')
              : ''
          }${!!section.text2 ? generateHTML(section.text2, [richTextProfile]) : ''}`
            )
            .join('')}`
        : '',
    [images, sections]
  );

  return (
    <div className={`rich-text ${className}`}>
      {parse(`${generateHTML(content, [richTextProfile])}${sectionsHtml}`, options)}
    </div>
  );
}
