import Avatar from '../components/Avatar';
import DateFormatter from './DateFormatter';
import Link from 'next/link';
import Blog from '../types/blog-type';

export default function PostPreview(blog: Blog) {
  return (
    <div>
      <h3>
        <Link as={`/posts/${blog.id}`} href="/posts/[slug]">
          {blog.title}
        </Link>
      </h3>
      <div>{blog.primaryTopic}</div>
      <div>
        <DateFormatter dateString={blog.issueDate} />
      </div>
      <p>{blog.summary}</p>
      <Avatar
        name={blog.author?.results[0]?.authorName}
        picture={blog.author.results[0]?.authorFace?.results[0]?.fileUrl}
      />
    </div>
  );
}
