import Link from 'next/link'

export default function TeamMemberPreview({
  slug,
  name,
  picture,
  role,
}) {
  return (
    <div className="flex flex-row flex-nowrap justify-start items-start mb-12">
      <div className="order-none self-auto flex-none mr-6">
        <Link href={`/team/${slug}`}>
          <a className="hover:underline">
            <img src={picture} width="140" alt={name} />
          </a>
        </Link>
      </div>
      <div className="order-none self-auto flex-auto">
        <Link href={`/team/${slug}`}>
          <a className="hover:underline">
            <h2 className="text-3xl leading-snug">{name}</h2>
            <div className="text-xl mb-3">{role}</div>
          </a>
        </Link>
      </div>
    </div>
  )
}
