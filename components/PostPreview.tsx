import Blog from '../types/blog-type';
import { ArrowButton } from './Buttons';
import PostProductsList from './PostProductsList';
import PostDate from './PostDate';
import Link from 'next/link';

export default function PostPreview(blog: Blog) {
  const hasProducts = blog.products.results && blog.products.results.length > 0;

  return (
    <article className="post-preview">
      <PostDate date={blog.issueDate} />
      <div className="post-preview-content">
        <div className="post-preview-body">
          <Link href={`/posts/${blog.id}`}>
            <h3 className="post-preview-title">{blog.title}</h3>
          </Link>
          <p className="post-preview-author">
            <Link href={`/team/${blog.author?.results[0]?.id}`} className="author-preview">
              by {blog.author?.results[0]?.authorName}
            </Link>
          </p>
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
