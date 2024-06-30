'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { Navigation } from '@/components/pages/home/components/section-04/navigation'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const IMAGES = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
]

export function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0)

  const swiperRef = useRef<SwiperRef>(null)

  const maxSlides = IMAGES.length - 1

  const handleSlidePrev = () => {
    if (slideIndex === 0 || !swiperRef.current) return

    swiperRef.current.swiper.slideTo(slideIndex - 1)
  }

  const handleSlideNext = () => {
    if (slideIndex === maxSlides || !swiperRef.current) return

    swiperRef.current.swiper.slideTo(slideIndex + 1)
  }

  return (
    <>
      <div className="bg-zinc-800/50 p-6">
        <Swiper
          ref={swiperRef}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          updateOnWindowResize
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={false}
          className="h-[256px] rounded-lg"
          modules={[EffectCoverflow, Pagination]}
          onSlideChange={(slide) => setSlideIndex(slide.realIndex)}
        >
          {IMAGES.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <Image src={slide} alt="slide" fill className="object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Navigation
        slideIndex={slideIndex}
        onLeftClick={handleSlidePrev}
        onRightClick={handleSlideNext}
        maxSlides={maxSlides}
      />
    </>
  )
}
