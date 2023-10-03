import Avatar from "../components/Avatar";
import DateFormatter from "./DateFormatter";
import Link from "next/link";
import Blog from "../types/blog-type";

export default function PostPreview(blog: Blog) {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${blog.id}`} href="/posts/[slug]" className="hover:underline">
          {blog.title}
        </Link>
      </h3>
      <div className={`mb-8 blog-title-block blog-title-block-${blog.primaryTopic}`}>
        {blog.primaryTopic}
      </div>
      <div className="text-lg mb-4 fst-italic">
        <DateFormatter dateString={blog.issueDate} />
      </div>
      <p className="text-xl leading-relaxed mb-4">{blog.summary}</p>
      <Avatar
        name={blog.author?.results[0]?.authorName}
        picture={blog.author.results[0]?.authorFace?.results[0]?.fileUrl}
      />
    </div>
  );
}
