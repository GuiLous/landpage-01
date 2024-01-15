/* eslint-disable tailwindcss/no-custom-classname */
'use client'

import { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useMediaQuery } from 'react-responsive'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CustomIcon } from '@/components/shared'

import { CenteredCarouselItem } from './CenteredCarouselItem'

import 'swiper/css'

interface CenteredCarouselProps {
  data: StoreItem[]
  setActiveItemIndex: (state: number) => void
  setPreviewSelected: (state: number) => void
}

export function CenteredCarousel({
  data = [],
  setActiveItemIndex,
  setPreviewSelected,
}: CenteredCarouselProps) {
  const isLessThan3xl = useMediaQuery({
    query: '(max-width: 1600px)',
  })
  const [activeSlide, setAtiveSlide] = useState(Math.ceil(data.length / 2) - 1)

  const onChangeSlide = (index: number) => {
    setPreviewSelected(0)
    setActiveItemIndex(index)
  }

  const isFirstSlide = activeSlide === 0
  const isLastSlide = activeSlide === data.length - 1

  return (
    <div
      className={twMerge(
        'relative w-fit items-center justify-center h-[86px]',
        '3xl:h-[66px]'
      )}
    >
      <div
        className={twMerge(
          'image-swiper-button-next right-1 absolute top-[calc(50%_-_12px)] z-10 w-auto flex-initial cursor-pointer',
          'group',
          isLastSlide && 'opacity-50 pointer-events-none'
        )}
      >
        <CustomIcon
          icon={IoIosArrowForward}
          className={twMerge(
            'h-6 w-6 text-gray-300 transition-colors',
            'group-hover:text-white'
          )}
        />
      </div>

      <div
        className={twMerge(
          'image-swiper-button-prev left-1 absolute top-[calc(50%_-_12px)] z-10 w-auto flex-initial cursor-pointer',
          'group',
          isFirstSlide && 'opacity-50 pointer-events-none'
        )}
      >
        <CustomIcon
          icon={IoIosArrowBack}
          className={twMerge(
            'h-6 w-6 text-gray-300 transition-colors',
            'group-hover:text-white'
          )}
        />
      </div>

      <Swiper
        spaceBetween={isLessThan3xl ? 10 : 14}
        slidesPerView={isLessThan3xl ? 11.367 : 10.119}
        centeredSlides={true}
        loop={false}
        slideToClickedSlide
        className="block h-full flex-initial"
        allowTouchMove={false}
        initialSlide={Math.ceil(data.length / 2) - 1}
        navigation={{
          nextEl: '.image-swiper-button-next',
          prevEl: '.image-swiper-button-prev',
          disabledClass: '.swiper-button-disabled',
        }}
        modules={[Navigation]}
        onActiveIndexChange={(slide) => setAtiveSlide(slide.activeIndex)}
        onSlideChange={(slide) => onChangeSlide(slide.activeIndex)}
      >
        {data.map((item, index) => (
          <SwiperSlide
            className={twMerge('max-w-[86px]', '3xl:max-w-[66px]')}
            key={index}
            onClick={() => onChangeSlide(index)}
          >
            <CenteredCarouselItem
              activeSlide={activeSlide}
              foreground_image={item.foreground_image}
              index={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
