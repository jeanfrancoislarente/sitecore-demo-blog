import Image from 'next/image';
import Link from 'next/link';

type AuthorAvatarProps = {
  id: string;
  name: string;
  picture: string;
  jobTitle: string;
};

export default function AuthorAvatar({ id, name, picture, jobTitle }: AuthorAvatarProps) {
  return (
    <div className="author-avatar">
      <Link href={`/team/${id}`}>
        {picture && (
          <Image src={picture} width={80} height={80} alt={name} className="author-avatar-img" />
        )}
        <h5 className="author-avatar-name">{name}</h5>
        <p className="author-avatar-jobtitle">{jobTitle}</p>
      </Link>
    </div>
  );
}
