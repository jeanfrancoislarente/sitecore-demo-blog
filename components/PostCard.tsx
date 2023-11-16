import Blog from '../types/blog-type';
import PostDate from './PostDate';
import Link from 'next/link';
import Image from 'next/image';

export default function PostCard(blog: Blog) {
  const hasProducts = blog.products.results && blog.products.results.length > 0;

  return (
    <article className="post-card">
      <Link href={`/posts/${blog.id}`}>
        <div className="post-card-content">
          <PostDate date={blog.issueDate} />
          <h4 className="post-card-title">{blog.title}</h4>
          <p className="post-card-author">by {blog.author?.results[0]?.authorName}</p>
          <p className="post-card-summary">{blog.summary}</p>
          {hasProducts && (
            <ul className="post-card-products">
              {blog.products.results.map((product) => (
                <li key={product.id}>
                  <Image
                    src={product.logo.results[0].fileUrl}
                    width={70}
                    height={70}
                    alt={product.name}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}
