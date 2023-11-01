import PostPreview from './PostPreview';
import Blog from '../types/blog-type';

type MoreStoriesProps = {
  posts: Blog[];
  title: string;
};

export default function MoreStories(props: MoreStoriesProps) {
  return (
    <section className="more-stories">
      <h2 className="more-stories-title">{props.title}</h2>
      <div className="more-stories-list">
        {props.posts.map((post) => (
          <PostPreview key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
