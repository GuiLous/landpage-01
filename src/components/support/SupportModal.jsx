import { Button, Text, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Container, FileInput, Modal } from '@components'

let formSchema = yup.object({
  description: yup.string().required(),
})

export default function SupportModal({ isOpenModal, handleClose }) {
  const [files, setFiles] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

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

          </Container>

          <Button minH="42px" mt="18px" type="submit">
            ENVIAR
          </Button>
        </form>
      </Container>
    </Modal>
  )
}
