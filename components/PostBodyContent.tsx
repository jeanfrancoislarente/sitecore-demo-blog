import Blog from '../types/blog-type';
import { useCallback, useMemo, useState } from 'react';
import PostBodyImageSlider from './PostBodyImageSlider';
import { Media } from '../types/Common/media-type';
import RichText from './RichText';

type PostBodyContentProps = {
  blog: Blog;
};

export default function PostBodyContent({ blog }: PostBodyContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedSliderImage, setDisplayedSliderImage] = useState<number>(0);

  const handleImageClick = useCallback((imageIndex: number) => {
    setDisplayedSliderImage(imageIndex);
    setIsModalOpen(true);
  }, []);

  const images: Media[] = useMemo(
    () =>
      blog.content.results
        .map((section) => section.images && section.images.results.map((image) => image))
        .flat(),
    [blog.content.results]
  );

  return (
    <>
      <RichText
        content={blog.body}
        sections={blog.content.results}
        imageClickHandler={handleImageClick}
        className="post-body-content"
      />
      <PostBodyImageSlider
        images={images}
        initialSlide={displayedSliderImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
