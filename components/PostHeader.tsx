import PostTitle from './PostTitle';

type PostHeaderProps = {
  title: string;
  primaryTopic: string;
};

export default function PostHeader({ title, primaryTopic }: PostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div>{primaryTopic}</div>
    </>
  );
}
