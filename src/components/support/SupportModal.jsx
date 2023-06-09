import { Button, Text, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'

import { Container, FileCard, FileInput, Modal, Select } from '@components'

let formSchema = yup.object({
  description: yup.string().required(),
  subject: yup.string().required(),
})

const options = [
  {
    value: 'Relatar um bug - algo não está funcionando corretamente',
    label: 'Relatar um bug - algo não está funcionando corretamente',
  },
  { value: 'Reportar um usuário', label: 'Reportar um usuário' },
  { value: 'Sugestão de funcionalidade', label: 'Sugestão de funcionalidade' },
  { value: 'Ajuda', label: 'Ajuda' },
]

export default function SupportModal({ isOpenModal, handleClose }) {
  const [files, setFiles] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })
  console.log('🚀 - errors:', errors)

  const onRemoveFiles = (fileName) => {
    const filesFiltered = files.filter((file) => file.name !== fileName)

    setFiles(filesFiltered)
  }

  const SubmitForm = (data) => {
    console.log('data', data)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      title="SUPORTE RELOAD CLUB"
      onClose={handleClose}
      headerMarginBottom={24}
      size="xl"
    >
      <Container
        justify="center"
        align="center"
        column
        gap={32}
        style={{ padding: '0 40px' }}
      >
        <Text color="gray.700" fontSize={14} textAlign="center">
          Tem alguma dúvida? Envie para nosso suporte e logo retornaremos.
        </Text>

        <form
          method="POST"
          onSubmit={handleSubmit(SubmitForm)}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Container column gap={14}>
            <Container style={{ display: 'block' }}>
              <Select
                control={control}
                options={options}
                isInvalid={errors.subject}
              />
            </Container>

            <Textarea
              isInvalid={errors.description}
              placeholder="Descrição"
              variant="primary"
              {...register('description')}
            />

            <FileInput
              files={files}
              setFiles={setFiles}
              register={register}
              setValue={setValue}
            />

            <Container
              align="center"
              justify="between"
              gap={12}
              style={{ flexWrap: 'wrap' }}
            >
              {files.map((file, index) => (
                <FileCard
                  key={index}
                  file={file}
                  onRemoveFiles={onRemoveFiles}
                />
              ))}
            </Container>
          </Container>

          <Button minH="42px" mt="18px" type="submit">
            ENVIAR
          </Button>
        </form>
      </Container>
    </Modal>
  )
}
