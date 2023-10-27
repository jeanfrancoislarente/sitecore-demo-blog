import Link from 'next/link';
import { Media } from '../types/Common/media-type';
import Image from 'next/image';

type AuthorPreviewProps = {
  name: string;
  photo: Media;
  jobTitle: string;
  bio: string;
  slug: string;
};

export default function AuthorPreview({ name, photo, jobTitle, bio, slug }: AuthorPreviewProps) {
  return (
    <div>
      {photo && (
        <Link href={`/team/${slug}`}>
          <Image src={photo.fileUrl} width={100} height={100} alt={photo.name} />
        </Link>
      )}
      <div>
        <h2>
          <Link href={`/team/${slug}`}>{name}</Link>
        </h2>
        <h5>{jobTitle}</h5>
        <p>{bio}</p>
      </div>
    </div>
  );
}
