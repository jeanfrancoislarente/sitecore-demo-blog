import stylesHp from "../../styles/Homepage/Homepage.module.css";
import Blog from "../types/blog-type";
import Link from "next/link";
import Image from "next/image";

type Props = {
  allBlogs: Blog[];
};

const BlogCard = ({ allBlogs }: Props) => {
  return (
    <div>
      {allBlogs.map((blog: Blog) => (
        <div key={blog.id} className={stylesHp.boxOuter}>
          <div className={stylesHp.box}>
            <Image
              alt=""
              src={blog.relatedMedia.results[0].fileUrl}
              width="500"
              height="500"
              className={stylesHp.boxImage}
            />
            <h2>{blog.title}</h2>
            <p className={stylesHp.boxText}>{blog.summary}</p>
            <p>
              <button className={stylesHp.button}>
                <Link href={`/posts/${encodeURIComponent(blog.id)}`}>
                  Read more
                </Link>
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
