import Image from 'next/image';
import { Media } from '../types/Common/media-type';

interface Props {
  image: Media | undefined;
  index: number;
  onClick: (index: number) => void;
}

const PostBodyImage = ({ image, index, onClick }: Props) => {
  return (
    <Image
      src={image?.fileUrl || ''}
      alt={image?.fileName || ''}
      onClick={() => onClick(index)}
      width={Number(image?.fileWidth)}
      height={Number(image?.fileHeight)}
    />
  );
};

export default PostBodyImage;
