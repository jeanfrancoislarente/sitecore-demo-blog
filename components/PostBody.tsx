import Blog from '../types/blog-type';
import PostBodySidebar from './PostBodySidebar';
import PostBodyContent from './PostBodyContent';

type PostBodyProps = {
  blog: Blog;
};

export default function PostBody({ blog }: PostBodyProps) {
  return (
    <section className="post-body">
      <PostBodySidebar
        author={blog.author.results[0]}
        repositories={blog.repositories.results}
        products={blog.products.results}
      />
      <PostBodyContent blog={blog} />
    </section>
  );
}
