import Modal from './Modal';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Media } from '../types/Common/media-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  images: Media[];
  initialSlide: number | 0;
  isOpen: boolean;
  onClose: () => void;
}

const PostBodyImageSlider = ({ images, initialSlide, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Swiper
        navigation={{
          prevEl: '.image-slider-navigation-prev',
          nextEl: '.image-slider-navigation-next',
        }}
        modules={[Navigation]}
        className="post-body-image-slider"
        initialSlide={initialSlide}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.fileUrl}
              alt={image.name}
              width={Number(image?.fileWidth)}
              height={Number(image?.fileHeight)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="image-slider-navigation-prev">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="image-slider-navigation-next">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </Modal>
  );
};

export default PostBodyImageSlider;
