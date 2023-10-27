import Avatar from './Avatar';
import DateFormatter from './DateFormatter';
import Link from 'next/link';
import Author from '../types/author-type';
import Repository from '../types/repository-type';

type PostBodyProps = {
  date: string;
  author: Author;
  repositories: Repository[];
  body: string;
};

export default function PostBody({ date, author, repositories, body }: PostBodyProps) {
  return (
    <div>
      <div>
        <div>
          <Avatar name={author?.authorName} picture={author?.authorFace.results[0].fileUrl} />
        </div>
        {repositories && repositories.length > 0 && (
          <div>
            <div>Related repositories:</div>
            {repositories.map((repository) => (
              <div key={repository.id}>
                <Link href={`/repositories/${repository.id}`}>{repository.name}</Link>
              </div>
            ))}
          </div>
        )}
        <div>
          <DateFormatter dateString={date} />
        </div>
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}
