import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import Link from 'next/link'

export default function HeroPost({
  title,
  date,
  excerpt,
  author,
  slug,
  primaryTopic,
}) {
  return (
    <section>
      <div className="md:grid md:gap-x-16 lg:gap-x-8 mb-20 md:mb-16">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className={`mb-8 blog-title-block blog-title-block-${primaryTopic}`}>
            {primaryTopic}
          </div>
          <div className="mb-4 md:mb-0 text-lg fst-italic">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-xl leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}
