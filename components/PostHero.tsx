import DateFormatter from './DateFormatter';
import Blog from '../types/blog-type';
import Image from 'next/image';
import { ArrowButton } from './Buttons';

export default function PostHero(blog: Blog) {
  return (
    <article className="post-hero">
      <div className="post-hero-date">
        <DateFormatter dateString={blog.issueDate} />
        <hr />
      </div>
      <div className="post-hero-content">
        <div className="post-hero-body">
          <h1 className="post-hero-title">{blog.title}</h1>
          <p className="post-hero-author">by {blog.author?.results[0]?.authorName}</p>
          <p className="post-hero-summary">{blog.summary}</p>
        </div>
        <ul className="post-hero-products">
          {/* TODO: replace with real data */}
          <li>
            <Image
              src="/assets/blog/shared/XMCloud-logo-color.svg"
              width={32}
              height={36}
              alt={'XM Cloud'}
            />
            <span>XM Cloud</span>
          </li>
          <li>
            <Image
              src="/assets/blog/shared/ordercloud-logo-color.svg"
              width={32}
              height={36}
              alt={'OrderCloud'}
            />
            <span>OrderCloud</span>
          </li>
          <li>
            <Image
              src="/assets/blog/shared/connect-logo-color.svg"
              width={32}
              height={36}
              alt={'Connect'}
            />
            <span>Connect</span>
          </li>
        </ul>
      </div>
      <div className="post-hero-link">
        <ArrowButton label="Read more" href={`/posts/${blog.id}`} />
      </div>
    </article>
  );
}
