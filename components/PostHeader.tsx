import { useMemo } from 'react';
import PostDate from './PostDate';
import SocialShare from './SocialShare';

type PostHeaderProps = {
  title: string;
  summary: string;
  date: string;
};

export default function PostHeader({ title, summary, date }: PostHeaderProps) {
  const url = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

  return (
    <section className="post-header">
      <div className="post-header-content">
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
      <div className="post-header-share">
        <h6>Share</h6>
        <SocialShare title={title} url={url} />
      </div>
      <PostDate date={date} />
    </section>
  );
}
