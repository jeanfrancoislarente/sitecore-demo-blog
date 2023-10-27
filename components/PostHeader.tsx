import PostTitle from './PostTitle';

type PostHeaderProps = {
  title: string;
  primaryTopic: string;
};

export default function PostHeader({ title, primaryTopic }: PostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className={`mb-8 blog-title-block blog-title-block-${primaryTopic}`}>{primaryTopic}</div>
    </>
  );
}
