import Link from 'next/link'

export default function RepositoryPreview({
  title,
  slug,
  excerpt
}) {
  return (
    <>
      <h2>
        <Link href={`/repositories/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h2>
      <p>{excerpt}</p>
    </>
  )
}
