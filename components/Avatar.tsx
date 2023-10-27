import Image from 'next/image';

type AvatarProps = {
  name: string;
  picture: string;
};

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div>
      {picture && <Image src={picture} width={48} height={48} alt={name} />}
      <div>{name}</div>
    </div>
  );
}
