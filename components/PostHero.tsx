import Blog from '../types/blog-type';
import { ArrowButton } from './Buttons';
import PostProductsList from './PostProductsList';
import PostDate from './PostDate';
import Link from 'next/link';

export default function PostHero(blog: Blog) {
  const hasProducts = blog.products.results && blog.products.results.length > 0;

  return (
    <article className="post-hero">
      <PostDate date={blog.issueDate} />
      <div className="post-hero-content">
        <div className="post-hero-body">
          <Link href={`/posts/${blog.id}`}>
            <h1 className="post-hero-title">{blog.title}</h1>
          </Link>
          <p className="post-hero-author">
            <Link href={`/team/${blog.author?.results[0]?.id}`} className="author-preview">
              by {blog.author?.results[0]?.authorName}
            </Link>
          </p>
          <p className="post-hero-summary">{blog.summary}</p>
        </div>
        {hasProducts && <PostProductsList products={blog.products.results} />}
      </div>
      <div className="post-hero-link">
        <ArrowButton label="Read more" href={`/posts/${blog.id}`} />
      </div>
    </article>
  );
}
