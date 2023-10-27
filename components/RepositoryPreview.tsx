import Link from 'next/link';

type RepositoryPreviewProps = {
  title: string;
  slug: string;
  excerpt: string;
};

export default function RepositoryPreview({ title, slug, excerpt }: RepositoryPreviewProps) {
  return (
    <div>
      <h2>
        <Link href={`/repositories/${slug}`}>{title}</Link>
      </h2>
      <p>{excerpt}</p>
    </div>
  );
}
