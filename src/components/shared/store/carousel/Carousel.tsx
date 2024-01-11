'use client'

import { useState } from 'react'

import { StoreItem } from '@/functions'

import { ModalBuyItemConfirmation } from '@/components/shared'

import { CarouselItemContent } from './CarouselItemContent'
import { CarouselItemContentButton } from './CarouselItemContentButton'
import { CarouselPreview } from './CarouselPreview'
import { CarouselSlide } from './CarouselSlide'

interface CarouselProps {
  featured: StoreItem[]
}

export function Carousel({ featured }: CarouselProps) {
  const [indexContent, setIndexContent] = useState(0)
  const [openModalBuyItem, setOpenModalBuyItem] = useState(false)
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [itemPurchased, setItemPurchased] = useState<StoreItem | null>(null)

  const handleOpenModalConfirmation = (item: StoreItem) => {
    setItemPurchased(item)
    setOpenModalConfirmation(true)
  }

  return (
    <>
      <CarouselSlide
        featured={featured}
        indexContent={indexContent}
        setIndexContent={setIndexContent}
        openModalBuyItem={openModalBuyItem}
      >
        <CarouselPreview
          featured={featured}
          indexContent={indexContent}
          setIndexContent={setIndexContent}
        />

        {featured.length > 0 && (
          <CarouselItemContent
            name={featured[indexContent].name}
            description={featured[indexContent].description}
            currentIndex={indexContent}
          >
            <CarouselItemContentButton
              item={featured[indexContent]}
              openModalBuyItem={openModalBuyItem}
              setOpenModalBuyItem={setOpenModalBuyItem}
              handleOpenModalConfirmation={handleOpenModalConfirmation}
            />
          </CarouselItemContent>
        )}
      </CarouselSlide>

      {!!itemPurchased && (
        <ModalBuyItemConfirmation
          foregroundImage={itemPurchased.foreground_image}
          backgroundImage={itemPurchased?.background_image}
          open={openModalConfirmation}
          setOpen={setOpenModalConfirmation}
        />
      )}
    </>
  )
}
