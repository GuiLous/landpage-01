'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { staticBlurDataUrl } from '@/utils'

import { Media } from '@/functions'

import { CustomIcon, ModalShowSkin } from '@/components/shared'

import { useAudio } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface ItemsPreviewProps {
  imagesPreview?: Media[]
}

export function ItemsPreview({ imagesPreview = [] }: ItemsPreviewProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const [previewSelected, setPreviewSelected] = useState<Media | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (preview: Media) => {
    playSoundClick()
    setPreviewSelected(preview)
    setOpenModal(true)
  }

  return (
    <ul className={twMerge('flex items-center gap-2', 'ultrawide:gap-4')}>
      {imagesPreview.map((preview, index) => (
        <li
          key={index}
          className={twMerge(
            'relative h-11 w-11 cursor-pointer overflow-hidden rounded bg-gray-700/40 transition-colors',
            'hover:outline hover:outline-1 hover:outline-purple-400',
            'group',
            'ultrawide:h-14 ultrawide:w-14'
          )}
          onMouseEnter={playSoundHover}
          onClick={() => handleOpenModal(preview)}
        >
          {preview.media_type === 'image' && (
            <Image
              src={preview.file}
              alt=""
              className={twMerge('object-cover rounded absolute')}
              fill
              sizes="100vw"
              priority
              placeholder="blur"
              blurDataURL={staticBlurDataUrl()}
            />
          )}

          {preview.media_type !== 'image' && (
            <CustomIcon
              icon={BsPlayCircle}
              className={twMerge(
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all absolute text-xl text-gray-300',
                '3xl:text-lg',
                'group-hover:text-white'
              )}
            />
          )}
        </li>
      ))}

      {previewSelected && (
        <ModalShowSkin
          open={openModal}
          setOpen={setOpenModal}
          preview={previewSelected}
        />
      )}
    </ul>
  )
}
