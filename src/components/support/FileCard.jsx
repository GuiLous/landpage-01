import gifFileImg from '@assets/images/gif_file.png'
import jpgFileImg from '@assets/images/jpg_file.png'
import pdfFileImg from '@assets/images/pdf_file.png'
import pngFileImg from '@assets/images/png_file.png'

import { CloseIcon, Container } from '@components'

import { Icon, Image, Text, useMediaQuery } from '@chakra-ui/react'

import style from './FileCard.module.css'

const images = {
  jpg: jpgFileImg,
  png: pngFileImg,
  pdf: pdfFileImg,
  gif: gifFileImg,
}

export default function FileCard({ file, onRemoveFiles }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

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
      <Container gap={isLessThan2xl ? 8 : 12} align="center">
        <Container className={style.imageFile}>
          <Image
            src={images[`${getFileType()}`]}
            alt={getFileType() + ' image'}
            w={{ base: '28px', md: '21px', '2xl': '28px' }}
            h={{ base: '37px', md: '30px', '2xl': '37px' }}
          />
        </Container>

        <Container column gap={isLessThan2xl ? 6 : 8}>
          <Text
            lineHeight={1}
            color="white"
            fontSize={{ base: 12, md: 10, '2xl': 12 }}
            as="span"
          >
            {file.name}
          </Text>
          <Text
            lineHeight={1}
            color="gray.700"
            fontSize={{ base: 10, md: 8, '2xl': 10 }}
            as="span"
          >
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
