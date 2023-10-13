import Avatar from "./Avatar";
import DateFormatter from "./DateFormatter";
import Link from "next/link";
import markdownStyles from "./markdown-styles.module.css";
import Author from "../types/author-type";
import Repository from "../types/repository-type";

type PostBodyProps = {
  date: string;
  author: Author;
  repositories: Repository[];
  body: string;
};

export default function PostBody({ date, author, repositories, body }: PostBodyProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-8 gap-4">
      <div className="col-span-2 pt-6">
        <div className="block mb-6">
          <Avatar name={author?.authorName} picture={author?.authorFace.results[0].fileUrl} />
        </div>
        {repositories && repositories.length > 0 && (
          <div className="mb-6 text-lg repositoriesList">
            <div className="font-bold">Related repositories:</div>
            {repositories.map((repository) => (
              <div key={repository.id}>
                <Link href={`/repositories/${repository.id}`} className="hover:underline">
                  {repository.name}
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="mb-6 text-lg fst-italic">
          <DateFormatter dateString={date} />
        </div>
      </div>
      <div className="col-span-3 lg:col-span-6">
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}
