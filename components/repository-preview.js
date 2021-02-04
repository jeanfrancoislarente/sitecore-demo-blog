import Link from 'next/link'

export default function RepositoryPreview({
  title,
  slug,
  excerpt
}) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl leading-snug">
        <Link href={`/repositories/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h2>
      <p>{excerpt}</p>
    </div>
  )
}
