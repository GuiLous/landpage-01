/* eslint-disable tailwindcss/no-custom-classname */
'use client'

import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useMediaQuery } from 'react-responsive'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CustomIcon } from '@/components/shared'

import { CenteredCarouselItem } from './CenteredCarouselItem'

import 'swiper/css'

type ImagePreview = Pick<StoreItem, 'foreground_image' | 'in_use' | 'id'>[]

interface CenteredCarouselProps {
  data: ImagePreview
  isInventory: boolean
  hasItemInUse: boolean
  itemInUseIndex: number
  setActiveItemIndex: (state: number) => void
  setPreviewSelected?: (state: number) => void
}

export function CenteredCarousel({
  data = [],
  isInventory,
  setActiveItemIndex,
  setPreviewSelected,
  hasItemInUse,
  itemInUseIndex,
}: CenteredCarouselProps) {
  const isLessThan3xl = useMediaQuery({
    query: '(max-width: 1600px)',
  })

  const isOnLoop = data.length > 10

  const initialSlide =
    !isInventory && !isOnLoop ? Math.ceil(data.length / 2) - 1 : 0

  const [activeSlide, setActiveSlide] = useState(initialSlide)

  const isFirstSlide = activeSlide === 0
  const isLastSlide = activeSlide === data.length - 1

  const disableFirstSlide = isFirstSlide && !isOnLoop
  const disableLastSlide = isLastSlide && !isOnLoop

  const onChangeSlide = (index: number) => {
    if (setPreviewSelected) {
      setPreviewSelected(0)
    }
    setActiveSlide(index)
    setActiveItemIndex(index)
  }

  useEffect(() => {
    if (isInventory) {
      if (hasItemInUse) {
        setActiveSlide(itemInUseIndex)
        setActiveItemIndex(itemInUseIndex)
        return
      }

      setActiveSlide(0)
      setActiveItemIndex(itemInUseIndex)
    }
  }, [hasItemInUse, itemInUseIndex, isInventory, setActiveItemIndex])

  return (
    <div
      className={twMerge(
        'relative w-fit items-center justify-center h-[86px]',
        '3xl:h-[66px]'
      )}
    >
      {!isInventory && (
        <>
          <div
            className={twMerge(
              'image-swiper-button-next right-1 absolute top-[calc(50%_-_12px)] z-10 w-auto flex-initial cursor-pointer',
              'group',
              disableLastSlide && 'opacity-50 pointer-events-none'
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
              disableFirstSlide && 'opacity-50 pointer-events-none'
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
        </>
      )}

      {isInventory ? (
        <Swiper
          key={new Date().getTime()}
          slidesPerView="auto"
          spaceBetween={isLessThan3xl ? 10 : 14}
          centeredSlides={true}
          updateOnWindowResize
          slideToClickedSlide
          className={twMerge(
            'block h-full max-w-[998px] flex-initial',
            '3xl:max-w-[854px]'
          )}
          allowTouchMove={false}
          initialSlide={activeSlide}
          navigation={{
            nextEl: '.image-swiper-button-next',
            prevEl: '.image-swiper-button-prev',
            disabledClass: '.swiper-button-disabled',
          }}
          onSlideChange={(slide) => onChangeSlide(slide.realIndex)}
          modules={[Navigation]}
        >
          {data.map((item, index) => (
            <SwiperSlide
              className={twMerge(
                'max-w-[86px] min-w-[86px]',
                '3xl:max-w-[66px] 3xl:min-w-[66px]'
              )}
              key={item.id}
            >
              <CenteredCarouselItem
                activeSlide={activeSlide}
                foreground_image={item.foreground_image}
                index={index}
                isInventory={isInventory}
                in_use={item.in_use}
                hasItemInUse={hasItemInUse}
                itemId={item.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          spaceBetween={isLessThan3xl ? 10 : 14}
          slidesPerView="auto"
          centeredSlides={true}
          loopPreventsSliding
          updateOnWindowResize
          slideToClickedSlide
          roundLengths
          loop={isOnLoop}
          speed={100}
          className={twMerge(
            'block h-full max-w-[998px] flex-initial',
            '3xl:max-w-[854px]'
          )}
          initialSlide={activeSlide}
          allowTouchMove={false}
          navigation={{
            nextEl: '.image-swiper-button-next',
            prevEl: '.image-swiper-button-prev',
            disabledClass: '.swiper-button-disabled',
          }}
          onSlideChange={(slide) => onChangeSlide(slide.realIndex)}
          modules={[Navigation]}
        >
          {data.map((item, index) => (
            <SwiperSlide
              className={twMerge(
                'max-w-[86px] min-w-[86px]',
                '3xl:max-w-[66px] 3xl:min-w-[66px]'
              )}
              key={item.id}
            >
              <CenteredCarouselItem
                activeSlide={activeSlide}
                foreground_image={item.foreground_image}
                index={index}
                isInventory={isInventory}
                in_use={item.in_use}
                hasItemInUse={hasItemInUse}
                itemId={item.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
