'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { Media } from '@/functions'

import { CustomIcon } from '@/components/shared'

interface ModalBuyItemPreviewProps {
  currentFile: Media
  previewSelected: number
}
export function ModalBuyItemPreview({
  currentFile,
  previewSelected,
}: ModalBuyItemPreviewProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [canParallax, setCanParallax] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    if (previewSelected !== 0) return
    setCanParallax(true)
  }

  const handleMouseLeave = () => {
    setCanParallax(false)
  }

  const handleVideoClick = () => {
    const video = videoRef.current
    if (video?.paused) {
      setIsPlaying(true)
      video.play()
    } else {
      setIsPlaying(false)
      video?.pause()
    }
  }

  useEffect(() => {
    const parallax = (event: any) => {
      const box = boxRef.current
      const image = imageRef.current

      if (box && image && canParallax) {
        const position = 0.8
        const boxRect = box.getBoundingClientRect()
        const modalRect = document
          .querySelector('.chakra-modal__content-container')
          ?.getBoundingClientRect()

        const modalRectLeft = modalRect?.left || 0
        const x =
          (boxRect.width -
            (event.clientX - (boxRect.left + modalRectLeft)) -
            boxRect.width / 2) /
          position

        const modalRectTop = modalRect?.top || 0
        const y =
          (boxRect.height -
            (event.clientY - (boxRect.top + modalRectTop)) -
            boxRect.height / 2) /
          position

        image.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.5)`
      } else if (image) {
        image.style.transform = 'translate3d(0, 0, 0)'
      }
    }

    const modalElement = document.querySelector('[role="dialog"]')

    if (modalElement) {
      modalElement.addEventListener('mousemove', parallax)
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('mousemove', parallax)
      }
    }
  }, [canParallax])

  useEffect(() => {
    setIsPlaying(false)
  }, [currentFile])

  return (
    <>
      {currentFile.media_type === 'image' && (
        <div
          className={twMerge(
            'relative items-center justify-center overflow-hidden rounded-lg bg-gray-700/40 w-[504px] h-[504px]',
            '3xl:w-[384px] 3xl:h-[384px]'
          )}
        >
          <div
            className="h-full w-full items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={boxRef}
          >
            <Image
              src={currentFile.file}
              alt=""
              className={twMerge(
                'object-cover rounded-lg absolute z-10 h-full',
                previewSelected === 0 && 'py-12 3xl:py-10 object-scale-down'
              )}
              fill
              sizes="100%"
              draggable={false}
              ref={imageRef}
            />
          </div>
        </div>
      )}

      {currentFile.media_type !== 'image' && (
        <div
          key={currentFile?.id}
          className={twMerge(
            'bg-gray-750 rounded-lg cursor-pointer h-[504px] w-[504px] overflow-hidden relative',
            '3xl:h-[404px] 3xl:w-[404px]',
            'group'
          )}
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            onEnded={() => setIsPlaying(false)}
            className="absolute left-0 top-0 h-full w-full object-cover"
          >
            <source src={currentFile.file} type="video/mp4" />
          </video>

          {!isPlaying && (
            <CustomIcon
              icon={BsPlayCircle}
              className={twMerge(
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors absolute text-gray-300 text-[3.625rem]',
                '3xl:text-[3.375rem]',
                'group-hover:text-white'
              )}
            />
          )}
        </div>
      )}
    </>
  )
}
