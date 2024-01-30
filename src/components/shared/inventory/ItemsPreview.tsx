'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { Media } from '@/functions'

import { CustomIcon, ModalShowSkin } from '@/components/shared'

interface ItemsPreviewProps {
  imagesPreview?: Media[]
}

export function ItemsPreview({ imagesPreview = [] }: ItemsPreviewProps) {
  const [previewSelected, setPreviewSelected] = useState<Media | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (preview: Media) => {
    setPreviewSelected(preview)
    setOpenModal(true)
  }

  return (
    <ul className="flex items-center gap-2">
      {imagesPreview.map((preview, index) => (
        <li
          key={index}
          className={twMerge(
            'relative h-11 w-11 cursor-pointer overflow-hidden rounded bg-gray-700/40',
            'group'
          )}
          onMouseOver={() => handleOpenModal(preview)}
        >
          {preview.media_type === 'image' && (
            <Image
              src={preview.file}
              alt=""
              className={twMerge('object-cover rounded absolute')}
              fill
              sizes="100%"
              priority
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
