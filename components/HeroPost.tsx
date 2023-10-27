import Avatar from '../components/Avatar';
import DateFormatter from './DateFormatter';
import Link from 'next/link';
import Blog from '../types/blog-type';

export default function HeroPost(blog: Blog) {
  return (
    <section>
      <div className="md:grid md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${blog.id}`} href="/posts/[slug]" className="hover:underline">
              {blog.title}
            </Link>
          </h3>
          <div className={`mb-8 blog-title-block blog-title-block-${blog.primaryTopic}`}>
            {blog.primaryTopic}
          </div>
          <div className="mb-4 md:mb-0 text-lg fst-italic">
            <DateFormatter dateString={blog.issueDate} />
          </div>
        </div>
        <div>
          <p className="text-xl leading-relaxed mb-4">{blog.summary}</p>
          <Avatar
            name={blog.author.results[0].authorName}
            picture={blog.author.results[0].authorFace.results[0].fileUrl}
          />
        </div>
      </div>
    </section>
  );
}
