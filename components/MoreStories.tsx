import PostPreview from './PostPreview';
import Blog from '../types/blog-type';

type MoreStoriesProps = {
  posts: Blog[];
  title: string;
};

export default function MoreStories(props: MoreStoriesProps) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
        {props.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 mb-32">
        {props.posts.map((post) => (
          <PostPreview key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
