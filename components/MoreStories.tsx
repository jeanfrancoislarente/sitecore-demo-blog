import PostPreview from './PostPreview';
import Blog from '../types/blog-type';

type MoreStoriesProps = {
  posts: Blog[];
  title: string;
};

export default function MoreStories(props: MoreStoriesProps) {
  return (
    <section>
      <h2>{props.title}</h2>
      <div>
        {props.posts.map((post) => (
          <PostPreview key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
