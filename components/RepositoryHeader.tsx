import Link from 'next/link';
import PageTitle from '../components/PageTitle';

type RepositoryHeaderProps = {
  title: string;
  url: string;
};

export default function RepositoryHeader({ title, url }: RepositoryHeaderProps) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <Link href={url}>View on GitHub</Link>
    </>
  );
}
