'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { staticBlurDataUrl } from '@/utils'

import { Media } from '@/functions'

import { CustomIcon } from '@/components/shared'

import { useAudio } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface ModalBuyItemThumbsProps {
  imagesPreview: Media[]
  previewSelected: number
  setPreviewSelected: (state: number) => void
}

export function ModalBuyItemThumbs({
  imagesPreview,
  previewSelected,
  setPreviewSelected,
}: ModalBuyItemThumbsProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const isPreviewSelected = (index: number) => previewSelected === index

  const handleSetPreviewSelected = useCallback(
    (index: number) => {
      playSoundClick()
      setPreviewSelected(index)
    },
    [playSoundClick, setPreviewSelected]
  )

  return (
    <aside
      className={twMerge(
        'flex-col gap-3.5 max-w-16 min-w-16',
        '3xl:gap-2.5 3xl:max-w-[54px] 3xl:min-w-[54px]'
      )}
    >
      {imagesPreview.map((preview, index) => (
        <div
          key={index}
          className={twMerge(
            'bg-gray-700/40 rounded cursor-pointer max-h-16 min-h-16 overflow-hidden relative',
            'hover:outline hover:outline-1 hover:outline-purple-400',
            isPreviewSelected(index) && 'outline outline-1 outline-purple-400',
            'group',
            '3xl:max-h-[54px] 3xl:min-h-[54px]'
          )}
          onMouseEnter={!isPreviewSelected(index) ? playSoundHover : undefined}
          onClick={() => handleSetPreviewSelected(index)}
        >
          {preview.media_type === 'image' && (
            <Image
              src={preview.file}
              alt=""
              className={twMerge(
                'object-cover rounded absolute',
                index === 0 && 'object-scale-down p-1'
              )}
              fill
              priority
              sizes="15vw"
              quality={30}
              placeholder="blur"
              blurDataURL={staticBlurDataUrl()}
            />
          )}

          {preview.media_type === 'video' && (
            <CustomIcon
              icon={BsPlayCircle}
              className={twMerge(
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all absolute text-[1.75rem] text-gray-300',
                isPreviewSelected(index) && 'text-white',
                '3xl:text-2xl',
                'group-hover:text-white'
              )}
            />
          )}
        </div>
      ))}
    </aside>
  )
}
