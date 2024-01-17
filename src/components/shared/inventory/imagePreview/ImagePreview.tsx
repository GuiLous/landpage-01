'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

interface ImagePreviewProps {
  itemSelected: StoreItem | null
}
export function ImagePreview({ itemSelected }: ImagePreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const isNotNullItem = itemSelected?.id !== 0
  const hasBackground = !!itemSelected?.background_image

  const [canParallax, setCanParallax] = useState(false)

  const handleMouseEnter = () => {
    setCanParallax(true)
  }

  const handleMouseLeave = () => {
    setCanParallax(false)
  }

  useEffect(() => {
    const parallax = (event: any) => {
      const box = wrapperRef.current
      const image = imageRef.current

      if (box && image) {
        if (canParallax) {
          const position = 1
          const boxRect = box.getBoundingClientRect()
          const x =
            (boxRect.width - (event.pageX - boxRect.left) - boxRect.width / 2) /
            position
          const y =
            (boxRect.height -
              (event.pageY - boxRect.top) -
              boxRect.height / 2) /
            position

          image.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.5)`
        } else {
          image.style.transform = 'translate3d(0, 0, 0)'
        }
      }
    }

    document.addEventListener('mousemove', parallax)

    return () => {
      document.removeEventListener('mousemove', parallax)
    }
  }, [canParallax])

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge(
        'relative max-h-imagePreview items-center overflow-hidden bg-cover bg-no-repeat p-3 justify-start',
        isNotNullItem && 'justify-center',
        `3xl:max-h-imagePreviewLaptop`
      )}
      style={{
        backgroundImage:
          isNotNullItem && hasBackground
            ? `url(${itemSelected?.background_image})`
            : '',
      }}
    >
      {isNotNullItem ? (
        <div
          className="relative h-full w-[95%] flex-initial items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={wrapperRef}
        >
          {itemSelected?.foreground_image && (
            <Image
              src={itemSelected?.foreground_image}
              alt="Imagem do item"
              draggable={false}
              className="z-10 h-full object-scale-down py-12"
              sizes="100%"
              fill
              priority
              ref={imageRef}
            />
          )}
        </div>
      ) : (
        <span
          className={twMerge('ml-[20%] text-gray-300', '3xl:ml-0 3xl:text-sm')}
        >
          Ops, nenhum item selecionado.
        </span>
      )}
    </aside>
  )
}
