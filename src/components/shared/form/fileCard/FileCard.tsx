import Image from 'next/image'
import { RxCross1 } from 'react-icons/rx'

import gifFileImg from '@/assets/images/gif_file.png'
import jpgFileImg from '@/assets/images/jpg_file.png'
import pdfFileImg from '@/assets/images/pdf_file.png'
import pngFileImg from '@/assets/images/png_file.png'

const images = {
  jpg: jpgFileImg,
  png: pngFileImg,
  pdf: pdfFileImg,
  gif: gifFileImg,
}

interface FileCardProps {
  file: File
  onRemoveFiles: (fileName: string) => void
}

export function FileCard({ file, onRemoveFiles }: FileCardProps) {
  const fileSizeInBytes = file.size
  const fileSizeInKB = Number(fileSizeInBytes / 1024).toFixed(1)
  const fileSizeInMB = Number(fileSizeInBytes / (1024 * 1024)).toFixed(1)

  const getFileType = () => {
    switch (file.type) {
      case 'image/jpg':
        return 'jpg'
      case 'image/gif':
        return 'gif'
      case 'image/png':
        return 'png'
      case 'application/pdf':
        return 'pdf'
      default:
        return 'jpg'
    }
  }

  return (
    <div className="max-w-[50%] flex-[0_0_48.5%] items-center justify-between rounded border border-gray-700 bg-gray-1200 py-3 pl-3.5 pr-4 3xl:py-2 3xl:pl-2.5 3xl:pr-3">
      <div className="items-center gap-3 3xl:gap-2">
        <div className="h-[37px] w-[28px] max-w-[28px] 3xl:h-[30px] 3xl:w-[21px] 3xl:max-w-[21px]">
          <Image
            src={images[getFileType()]}
            alt={getFileType() + ' image'}
            className="h-[37px] w-[28px] max-w-[28px] 3xl:h-[30px] 3xl:w-[21px] 3xl:max-w-[21px]"
          />
        </div>

        <div className="max-w-[157.5px] flex-col gap-2 3xl:max-w-[130.91px] 3xl:gap-1.5">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-none text-white 3xl:text-[0.625rem]">
            {file.name}
          </span>
          <span className="text-[0.625rem] leading-none text-gray-300 3xl:text-[0.5rem]">
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
          className="cursor-pointer text-white transition-colors hover:text-gray-300"
          data-testid="close"
          onClick={() => onRemoveFiles(file.name)}
        />
      </div>
    </div>
  )
}
