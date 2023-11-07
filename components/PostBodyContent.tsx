import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import CodeBlock from './CodeBlock';
import Blog from '../types/blog-type';
import { generateHTML } from '@tiptap/html';
import { richTextProfile } from '../lib/Common/richTextConfiguration';
import PostBodyImage from './PostBodyImage';
import { useCallback, useState } from 'react';
import PostBodyImageSlider from './PostBodyImageSlider';
import { Media } from '../types/Common/media-type';

type PostBodyContentProps = {
  blog: Blog;
};

interface NodeWithChildrenAndData extends Element {
  data: string;
  children: NodeWithChildrenAndData[];
}

export default function PostBodyContent({ blog }: PostBodyContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedSliderImage, setDisplayedSliderImage] = useState<number>(0);

  const handleClick = useCallback((imageIndex: number) => {
    setDisplayedSliderImage(imageIndex);
    setIsModalOpen(true);
  }, []);

  const images: Media[] = [];

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
                  .map((image) => {
                    images.push(image);
                    return `<p><img src="${image.fileUrl}" /></p>`;
                  })
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

      if (domNode instanceof Element && domNode.attribs && domNode.tagName === 'img') {
        const image = images.find((img) => img.fileUrl === domNode.attribs.src);

        return (
          <PostBodyImage
            image={image}
            index={images.findIndex((img) => img.fileUrl === domNode.attribs.src)}
            onClick={handleClick}
          />
        );
      }
    },
  };

  return (
    <>
      <div className="post-body-content">{parse(body, options)}</div>
      <PostBodyImageSlider
        images={images}
        initialSlide={displayedSliderImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
