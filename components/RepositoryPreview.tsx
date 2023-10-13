import Link from "next/link";

type RepositoryPreviewProps = {
  title: string;
  slug: string;
  excerpt: string;
};

export default function RepositoryPreview({ title, slug, excerpt }: RepositoryPreviewProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl leading-snug">
        <Link href={`/repositories/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h2>
      <p>{excerpt}</p>
    </div>
  );
}
