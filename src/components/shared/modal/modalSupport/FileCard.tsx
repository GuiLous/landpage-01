import Image from 'next/image'
import { useCallback } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { IMAGE_TYPES, VIDEO_TYPES } from '@/constants'

const imgFileImg = '/assets/images/img_file.png'
const pdfFileImg = '/assets/images/pdf_file.png'
const vidFileImg = '/assets/images/vid_file.png'

const images = {
  img: imgFileImg,
  vid: vidFileImg,
  pdf: pdfFileImg,
}

interface FileCardProps {
  file: File
  onRemoveFiles: (fileName: string) => void
}

export function FileCard({ file, onRemoveFiles }: FileCardProps) {
  const fileSizeInBytes = file.size
  const fileSizeInKB = Number(fileSizeInBytes / 1024).toFixed(1)
  const fileSizeInMB = Number(fileSizeInBytes / (1024 * 1024)).toFixed(1)

  const getFileType = useCallback(() => {
    if (IMAGE_TYPES.includes(file.type)) return 'img'
    if (VIDEO_TYPES.includes(file.type)) return 'vid'

    return 'pdf'
  }, [file])

  return (
    <div
      className={twMerge(
        'max-w-[50%] flex-file_card items-center justify-between rounded border border-gray-700 bg-gray-1200 py-3 pl-3.5 pr-4',
        '3xl:py-2 3xl:pl-2.5 3xl:pr-3'
      )}
    >
      <div className={twMerge('items-center gap-3', '3xl:gap-2')}>
        <div
          className={twMerge(
            'h-[37px] w-[28px] max-w-[28px]',
            '3xl:h-[30px] 3xl:w-[21px] 3xl:max-w-[21px]'
          )}
        >
          <Image
            src={images[getFileType()]}
            alt={getFileType() + ' image'}
            className={twMerge(
              'h-[37px] w-[28px] max-w-[28px]',
              '3xl:h-[30px] 3xl:w-[21px] 3xl:max-w-[21px]'
            )}
          />
        </div>

        <div
          className={twMerge(
            'max-w-[157.5px] flex-col gap-2',
            '3xl:max-w-[130.91px] 3xl:gap-1.5'
          )}
        >
          <span
            className={twMerge(
              'truncate text-xs text-white',
              'leading-none',
              '3xl:text-[0.625rem]'
            )}
          >
            {file.name}
          </span>
          <span
            className={twMerge(
              'text-[0.625rem] leading-none text-gray-300',
              '3xl:text-[0.5rem]'
            )}
          >
            {Number(fileSizeInKB) > 1024
              ? `${fileSizeInMB} MB`
              : `${fileSizeInKB} KB`}{' '}
            <span className="text-green-400">- Pronto</span>
          </span>
        </div>
      </div>

      <div className="max-w-fit flex-initial">
        <RxCross1
          size={13}
          className={twMerge(
            'cursor-pointer text-white transition-colors',
            'hover:text-gray-300'
          )}
          data-testid="close"
          onClick={() => onRemoveFiles(file.name)}
        />
      </div>
    </div>
  )
}
