import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Link from 'next/link'

export default function PostHeader({ title, coverImage, date, author, repositories }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        { repositories && repositories.length > 0 && (
          <div className="mb-6 text-lg repositoriesList">
            Related repositories: { repositories.map(repository => <Link href={`/repositories/${repository}`}><a className="hover:underline">{repository}</a></Link>) }
          </div>
        )}
        <div className="mb-6 text-lg fst-italic">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
