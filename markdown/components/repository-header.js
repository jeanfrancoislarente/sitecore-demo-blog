import PageTitle from '../components/page-title'

export default function RepositoryHeader({ title, url }) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <a className="text-2xl md:text-3xl lg:text-4xl font-bold" href={url}>View on GitHub</a>
    </>
  )
}
