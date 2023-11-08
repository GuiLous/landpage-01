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

  const [magnifyStyle, setMagnifyStyle] = useState({})
  const [canParallax, setCanParallax] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleMouseEnter = () => {
    setCanParallax(true)
  }

  const handleMouseLeave = () => {
    setCanParallax(false)
  }

  const handleMouseMoveImage = (e: any) => {
    const { offsetX, offsetY, target } = e.nativeEvent
    const { offsetWidth, offsetHeight } = target

    const xPercentage = (offsetX / offsetWidth) * 100
    const yPercentage = (offsetY / offsetHeight) * 100

    setMagnifyStyle((prevState) => ({
      ...prevState,
      top: `${offsetY - 60}px`,
      left: `${offsetX + 60}px`,
      backgroundPosition: `${xPercentage}% ${yPercentage}%`,
    }))
  }

  useEffect(() => {
    const parallax = (event: any) => {
      const image = imageRef.current

      if (image) {
        if (canParallax) {
          const position = 5
          const x = (window.innerWidth / 2 - event.pageX) / position
          const y = (window.innerHeight / 2 - event.pageY) / position

          image.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.1)`
        } else {
          image.style.transform = 'translateX(0) translateY(0)'
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
        itemSelected && 'justify-center',
        `3xl:max-h-imagePreviewLaptop`
      )}
      style={{
        backgroundImage: itemSelected
          ? `url(${itemSelected.background_image})`
          : '',
      }}
    >
      {itemSelected ? (
        <>
          <Image
            src={itemSelected.foreground_image}
            alt="Imagem do item"
            draggable={false}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMoveImage}
            ref={imageRef}
            className="z-10 h-full cursor-pointer object-scale-down"
            sizes="100vw"
            width={310}
            height={500}
            priority
          />

          {isZoomed && (
            <div
              className={twMerge(
                'pointer-events-none absolute z-10 h-[200px] w-[200px] scale-0 rounded-full border border-white bg-300 bg-center bg-no-repeat',
                'animate-scale-up'
              )}
              style={{
                backgroundImage: `url(${itemSelected.foreground_image})`,
                ...magnifyStyle,
              }}
            />
          )}
        </>
      ) : (
        <span className="ml-[20%] text-gray-300">
          Ops, nenhum item selecionado.
        </span>
      )}
    </aside>
  )
}
