'use client'

import Image from 'next/image'
import { BsPlayCircle } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { Media } from '@/functions'

import { CustomIcon } from '@/components/shared'

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
  const isPreviewSelected = (index: number) => previewSelected === index

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
          onClick={() => setPreviewSelected(index)}
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
              sizes="100%"
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
