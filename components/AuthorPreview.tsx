import Link from 'next/link';
import { Media } from '../types/Common/media-type';
import AuthorProfilePhoto from './AuthorProfilePhoto';

type AuthorPreviewProps = {
  name: string;
  photo: Media;
  background: Media;
  jobTitle: string;
  slug: string;
};

export default function AuthorPreview({
  name,
  photo,
  background,
  jobTitle,
  slug,
}: AuthorPreviewProps) {
  return (
    <Link href={`/team/${slug}`} className="author-preview">
      {photo && <AuthorProfilePhoto photo={photo} background={background} name={name} />}
      <div>
        <h3>{name}</h3>
        <p>{jobTitle}</p>
      </div>
    </Link>
  );
}
