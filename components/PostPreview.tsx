import DateFormatter from './DateFormatter';
import Blog from '../types/blog-type';
import { ArrowButton } from './Buttons';
import PostProductsList from './PostProductsList';

export default function PostPreview(blog: Blog) {
  const hasProducts = blog.products.results && blog.products.results.length > 0;

  return (
    <article className="post-preview">
      <div className="post-preview-date">
        <DateFormatter dateString={blog.issueDate} />
        <hr />
      </div>
      <div className="post-preview-content">
        <div className="post-preview-body">
          <h3 className="post-preview-title">{blog.title}</h3>
          <p className="post-preview-author">by {blog.author?.results[0]?.authorName}</p>
          <p className="post-preview-summary">{blog.summary}</p>
        </div>
        {hasProducts && <PostProductsList products={blog.products.results} />}
      </div>
      <div className="post-preview-link">
        <ArrowButton label="Read more" href={`/posts/${blog.id}`} />
      </div>
    </article>
  );
}
