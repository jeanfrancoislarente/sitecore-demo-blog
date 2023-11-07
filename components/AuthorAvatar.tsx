import Image from 'next/image';

type AuthorAvatarProps = {
  name: string;
  picture: string;
  jobTitle: string;
};

export default function AuthorAvatar({ name, picture, jobTitle }: AuthorAvatarProps) {
  return (
    <div className="author-avatar">
      {picture && (
        <Image src={picture} width={80} height={80} alt={name} className="author-avatar-img" />
      )}
      <div className="author-avatar-content">
        <h5 className="author-avatar-name">{name}</h5>
        <p className="author-avatar-jobtitle">{jobTitle}</p>
      </div>
    </div>
  );
}
