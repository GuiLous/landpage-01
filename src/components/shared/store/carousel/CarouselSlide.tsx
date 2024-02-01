'use client'

import Image from 'next/image'
import { ReactNode } from 'react'
import { Carousel } from 'react-responsive-carousel'

import {
  STORE_FEATURED_INTERVAL,
  STORE_FEATURED_TRANSITION_TIME,
} from '@/constants'

import { StoreItem } from '@/functions'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface CarouselProps {
  featured: StoreItem[]
  indexContent: number
  openModalBuyItem: boolean
  children: ReactNode
  placeholdersCarousel: string[]
  setIndexContent: (state: number) => void
}

export function CarouselSlide({
  featured = [],
  indexContent,
  setIndexContent,
  openModalBuyItem,
  children,
  placeholdersCarousel,
}: CarouselProps) {
  const bgGradient = 'linear-gradient(90deg, #111 0%, rgba(17, 17, 17, 0) 100%)'

  return (
    <section className="relative h-fit flex-initial">
      {featured.length > 0 && (
        <Carousel
          showStatus={false}
          emulateTouch
          autoPlay={!openModalBuyItem}
          infiniteLoop
          stopOnHover={false}
          interval={STORE_FEATURED_INTERVAL}
          transitionTime={STORE_FEATURED_TRANSITION_TIME}
          showArrows={false}
          showThumbs={false}
          renderItem={(children) => {
            return (
              <div
                style={{
                  cursor: 'grabbing',
                  width: '100%',
                  height: '48vh',
                }}
              >
                {children}
              </div>
            )
          }}
          showIndicators={false}
          selectedItem={indexContent}
          onChange={(index) => setIndexContent(index)}
        >
          {featured.map((item, index) => (
            <div key={index} className="relative h-full">
              <Image
                src={item.featured_image}
                alt={item.name}
                className="object-cover"
                fill
                sizes="100vw"
                priority
                placeholder="blur"
                blurDataURL={placeholdersCarousel[index]}
              />

              <div
                className="absolute h-full"
                style={{ background: bgGradient }}
              />
            </div>
          ))}
        </Carousel>
      )}

      {children}
    </section>
  )
}
