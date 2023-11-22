import { useMemo } from 'react';
import PostDate from './PostDate';
import SocialShare from './SocialShare';
import PageHeader from './PageHeader';

type PostHeaderProps = {
  title: string;
  summary: string;
  date: string;
};

export default function PostHeader({ title, summary, date }: PostHeaderProps) {
  const url = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

  return (
    <>
      <PageHeader title={title} description={summary} className="post-header">
        <h6>Share</h6>
        <SocialShare title={title} url={url} />
      </PageHeader>
      <PostDate date={date} />
    </>
  );
}
