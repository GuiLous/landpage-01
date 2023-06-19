import gifFileImg from '@assets/images/gif_file.png'
import jpgFileImg from '@assets/images/jpg_file.png'
import pdfFileImg from '@assets/images/pdf_file.png'
import pngFileImg from '@assets/images/png_file.png'

import { CloseIcon, Container } from '@components'

import { Icon, Image, Text } from '@chakra-ui/react'

import style from './FileCard.module.css'

const images = {
  jpg: jpgFileImg,
  png: pngFileImg,
  pdf: pdfFileImg,
  gif: gifFileImg,
}

export default function FileCard({ file, onRemoveFiles }) {
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
    <Container align="center" justify="between" className={style.container}>
      <Container gap={12} align="center">
        <Container className={style.imageFile}>
          <Image
            src={images[`${getFileType()}`]}
            alt={getFileType() + ' image'}
            w="28px"
            h="37px"
          />
        </Container>

        <Container column gap={8}>
          <Text lineHeight={1} color="white" fontSize={12} as="span">
            {file.name}
          </Text>
          <Text lineHeight={1} color="gray.700" fontSize={10} as="span">
            {fileSizeInKB > 1024 ? `${fileSizeInMB} MB` : `${fileSizeInKB} KB`}{' '}
            <Text color="success" as="span">
              - Pronto
            </Text>
          </Text>
        </Container>
      </Container>

      <Container fitContent>
        <Icon
          as={CloseIcon}
          fill="white"
          w="10px"
          h="10px"
          cursor="pointer"
          data-testid="close"
          onClick={() => onRemoveFiles(file.name)}
        />
      </Container>
    </Container>
  )
}
