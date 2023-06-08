import { Box, Image, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'

import uploadImg from '@assets/images/upload.png'

import { Container } from '@components'

import style from './FileInput.module.css'

export default function FileInput({
  files,
  setFiles,
  isSingleFile = false,
  setValue,
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event) => {
    const newFiles = event.target.files
    setValue('files', [...files, ...newFiles])
    setFiles([...files, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = e.dataTransfer.files
    setValue('files', [...files, ...droppedFiles])
    setFiles([...files, ...droppedFiles])
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <Box
      className={[style.container, isDragging && style.dragging].join(' ')}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
    >
      <Input
        type="file"
        opacity={0}
        position="absolute"
        top={0}
        h="full"
        cursor="pointer"
        label=""
        onChange={handleFileChange}
        multiple={!isSingleFile}
      />

      <Container className={style.content} column gap={16}>
        <Container fitContent align="center" justify="center">
          <Image src={uploadImg} alt="upload image" w="36px" h="24px" />
        </Container>

        <Container fitContent gap={14} column align="center" justify="center">
          <Text
            fontSize={12}
            fontWeight="regular"
            lineHeight={1}
            color="gray.700"
            as="span"
          >
            Solte os arquivos aqui ou{' '}
            <Text fontWeight="semiBold" color="primary.400" as="span">
              Procure
            </Text>
          </Text>

          <Container column gap={8} align="center" justify="center">
            <Text
              fontSize={10}
              lineHeight={1}
              fontWeight="regular"
              color="gray.700"
              as="span"
            >
              Arquivos suportados:{' '}
              <Text fontWeight="medium" as="span">
                JPG, PNG, GIF, PDF
              </Text>
            </Text>

            <Text
              fontSize={10}
              lineHeight={1}
              fontWeight="regular"
              color="gray.700"
              as="span"
            >
              Tamanho máximo:{' '}
              <Text fontWeight="medium" as="span">
                3MB
              </Text>
            </Text>
          </Container>
        </Container>
      </Container>
    </Box>
  )
}
