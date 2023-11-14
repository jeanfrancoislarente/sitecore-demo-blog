import PostPreview from './PostPreview';
import Blog from '../types/blog-type';

type MoreStoriesProps = {
  posts: Blog[];
  title: string;
};

export default function MoreStories({ posts, title }: MoreStoriesProps) {
  return (
    <section className="more-stories">
      <h2 className="more-stories-title">{title}</h2>
      <div className="more-stories-list">
        {posts.map((post) => (
          <PostPreview key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
