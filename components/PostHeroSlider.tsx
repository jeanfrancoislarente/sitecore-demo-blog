import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Blog from '../types/blog-type';
import PostHero from './PostHero';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function PostHeroSlider({ posts }: { posts: Blog[] }) {
  return (
    <section className="post-hero-slider">
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          type: 'fraction',
          el: '.post-hero-slider-pagination',
          renderFraction: function (currentClass: string, totalClass: string) {
            return `<span class="${currentClass}"></span><span>/</span><span class="${totalClass}"></span>`;
          },
        }}
        navigation={{
          prevEl: '.post-hero-slider-navigation-prev',
          nextEl: '.post-hero-slider-navigation-next',
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="post-hero-slider-swiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostHero {...post} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="post-hero-slider-navigation-container">
        <div className="post-hero-slider-navigation">
          <button className="post-hero-slider-navigation-prev">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="post-hero-slider-pagination"></span>
          <button className="post-hero-slider-navigation-next">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </section>
  );
}
