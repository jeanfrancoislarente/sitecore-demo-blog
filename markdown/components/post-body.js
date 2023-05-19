import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import Link from 'next/link'
import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ date, author, repositories, content }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-8 gap-4">
        <div className="col-span-2 pt-6">
          <div className="block mb-6">
            <Avatar name={author.name} picture={author.picture} />
          </div>
          {repositories && repositories.length > 0 && (
            <div className="mb-6 text-lg repositoriesList">
              <strong>Related repositories:</strong><br/> 
              { repositories.map(repository => (
              <>
              <Link
                href={`/repositories/${repository}`}
                key={repository}
              >
                <a className="hover:underline">{repository}</a>
              </Link>
              <br />
              </>
            ))}
            </div>
          )}
          <div className="mb-6 text-lg fst-italic">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div className="col-span-3 lg:col-span-6">
          <div
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </>
  )
}
