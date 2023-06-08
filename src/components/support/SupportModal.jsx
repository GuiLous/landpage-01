import { Button, Text, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Container, FileInput, Modal } from '@components'

let formSchema = yup.object({
  description: yup.string().required(),
  files: yup.array().of(
    yup
      .mixed()
      .test(
        'fileSize',
        'File size is too large',
        (value) => value && value.size <= 3 * 1024 * 1024 // 3MB
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) =>
          value &&
          ['image/jpg', 'image/gif', 'image/png', 'application/pdf'].includes(
            value.type
          )
      )
  ),
})

export default function SupportModal({ isOpenModal, handleClose }) {
  const [files, setFiles] = useState([])
  console.log('🚀 - files:', files)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })
  console.log('🚀 - errors:', errors)

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
            gap: '14px',
          }}
        >
          <Container column gap={14}>
            <Textarea
              placeholder="Descrição"
              variant="primary"
              {...register('description')}
            />

            <Controller
              name="files"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange } }) => (
                <FileInput
                  files={files}
                  setFiles={setFiles}
                  register={register}
                  setValue={setValue}
                />
              )}
            />
          </Container>

          <Button minH="42px" mt="18px" type="submit">
            ENVIAR
          </Button>
        </form>
      </Container>
    </Modal>
  )
}
