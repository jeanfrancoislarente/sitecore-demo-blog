import Link from 'next/link';
import { ExternalLinkButton } from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

type RepositoryPreviewProps = {
  title: string;
  slug: string;
  excerpt: string;
  url: string;
};

export default function RepositoryPreview({ title, slug, excerpt, url }: RepositoryPreviewProps) {
  return (
    <article className="repository-preview">
      <Link href={`/repositories/${slug}`} className="repository-preview-title">
        <FontAwesomeIcon icon={faGithub} />
        <h4>{title}</h4>
      </Link>
      <p className="repository-preview-body">{excerpt}</p>
      <ExternalLinkButton href={url} label="View on Github" />
    </article>
  );
}
