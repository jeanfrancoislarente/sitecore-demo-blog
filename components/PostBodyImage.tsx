import Image from 'next/image';
import { Media } from '../types/Common/media-type';

type PostBodyImageProps = {
  image: Media;
  index: number;
  onClick: (index: number) => void;
};

const PostBodyImage = ({ image, index, onClick }: PostBodyImageProps) => {
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
