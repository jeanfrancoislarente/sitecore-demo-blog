import Link from 'next/link'

export default function RepositoryPreview({
  title,
  slug,
  excerpt
}) {
  return (
    <>
      <h2 className="text-3xl mb-3 leading-snug">
        <Link href={`/repositories/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h2>
      <p>{excerpt}</p>
    </>
  )
}
