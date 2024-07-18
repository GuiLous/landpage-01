'use client'

import { useRef, useState } from 'react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { Navigation } from '@/components/pages/home/components/section-04/navigation'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const AboutMeInfos = [
  'Entrei no mercado em 2003, comecei empreender com os meus 14 anos de idade.',
  'Aos 14 anos, eu dei o primeiro passo em direção ao meu sonho de empreender.',
  'Com uma paixão inabalável e muita determinação, comecei a transformar minhas ideias em realidade.',
  'Desde aquele momento inicial, enfrentei desafios, aprendi com cada erro e celebrei cada pequeno sucesso.',
  'Hoje, sou um empreendedor realizado e quero ajudar você a alcançar o mesmo.',
]

export function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0)

  const swiperRef = useRef<SwiperRef>(null)

  const maxSlides = AboutMeInfos.length - 1

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
          className="h-[256px] rounded-lg will-change-transform"
          modules={[EffectCoverflow, Pagination]}
          onSlideChange={(slide) => setSlideIndex(slide.realIndex)}
        >
          {AboutMeInfos.map((info, index) => (
            <SwiperSlide key={index} className="relative will-change-transform">
              <div className="flex h-full w-full flex-1 items-center justify-center bg-gray-500/50 p-4">
                <p className="text-center text-xl font-bold">{info}</p>
              </div>
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
