import DateFormatter from './DateFormatter';
import Blog from '../types/blog-type';
import { ArrowButton } from './Buttons';
import Image from 'next/image';

export default function PostPreview(blog: Blog) {
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
        <ul className="post-preview-products">
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
      <div className="post-preview-link">
        <ArrowButton label="Read more" href={`/posts/${blog.id}`} />
      </div>
    </article>
  );
}
