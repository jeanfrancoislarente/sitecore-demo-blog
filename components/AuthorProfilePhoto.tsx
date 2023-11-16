import { Media } from '../types/Common/media-type';
import Image from 'next/image';

type AuthorProfilePhotoProps = {
  name: string;
  photo: Media;
  background: Media;
  largeVariant?: boolean;
};

export default function AuthorProfilePhoto({
  name,
  photo,
  background,
  largeVariant,
}: AuthorProfilePhotoProps) {
  return (
    <div className={`author-profile-photo ${largeVariant ? 'large' : ''}`}>
      <div
        className="profile-background"
        style={{ backgroundImage: `url("${background?.fileUrl}")` }}
      ></div>
      <Image
        src={photo?.fileUrl}
        width={largeVariant ? 320 : 208}
        height={largeVariant ? 320 : 208}
        alt={name}
        className="profile-photo"
      />
    </div>
  );
}
