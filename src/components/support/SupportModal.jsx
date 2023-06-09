import { Button, Text, Textarea, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SupportAPI } from '@api'
import {
  ConfirmationContent,
  Container,
  FileCard,
  FileInput,
  Modal,
  Select,
} from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'
import { useDispatch } from 'react-redux'

const options = [
  {
    value: 'Relatar um bug - algo não está funcionando corretamente',
    label: 'Relatar um bug - algo não está funcionando corretamente',
  },
  { value: 'Reportar um usuário', label: 'Reportar um usuário' },
  { value: 'Sugestão de funcionalidade', label: 'Sugestão de funcionalidade' },
  { value: 'Ajuda', label: 'Ajuda' },
]

export default function SupportModal({ isOpen, setOpenSupport }) {
  const dispatch = useDispatch()

  const [fetching, setFetching] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState(null)

  const { register, handleSubmit, setValue, control, reset, watch } = useForm({
    defaultValues: {
      description: '',
      subject: '',
      files: [],
    },
  })

  const { description, files, subject } = watch()
  const canSubmit = description !== '' && subject !== ''

  const handleCloseModalSupport = () => {
    reset()
    setOpenSupport(false)
  }

  const onRemoveFiles = (fileName) => {
    const filesFiltered = files.filter((file) => file.name !== fileName)

    setValue('files', filesFiltered)
  }

  const SubmitForm = async (data) => {
    setFetching(true)
    const userToken = StorageService.get('token')

    const formData = new FormData()

    formData.append('description', data.description)
    formData.append('subject', data.subject)

    for (let file of files) {
      formData.append('files', file)
    }

    const response = await SupportAPI.createTicket(userToken, formData)

    if (response.fieldsErrors) {
      setFieldsErrors(response.fieldsErrors)
      setFetching(false)
      return
    } else if (response.errorMsg) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
      setFetching(false)
      return
    }

    setFormSent(true)
    reset()
    setFetching(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      title="SUPORTE RELOAD CLUB"
      onClose={handleCloseModalSupport}
      headerMarginBottom={formSent ? 32 : 24}
      size="xl"
    >
      {formSent ? (
        <ConfirmationContent />
      ) : (
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
              <VStack alignItems="initial" w="100%">
                <Select
                  control={control}
                  options={options}
                  isInvalid={fieldsErrors?.subject}
                />

                {fieldsErrors?.subject && (
                  <Text
                    fontSize={12}
                    color="danger.400"
                    pl="5px"
                    mt="12px"
                    fontWeight="medium"
                  >
                    {fieldsErrors?.subject}
                  </Text>
                )}
              </VStack>

              <Container column>
                <Textarea
                  isInvalid={fieldsErrors?.description}
                  placeholder="Descrição"
                  variant="primary"
                  {...register('description')}
                />

                {fieldsErrors?.description && (
                  <Text
                    fontSize={12}
                    color="danger.400"
                    pl="5px"
                    mt="12px"
                    fontWeight="medium"
                  >
                    {fieldsErrors?.description}
                  </Text>
                )}
              </Container>

              <FileInput
                files={files}
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

            <Button
              type="submit"
              minH="42px"
              mt="18px"
              fontWeight="semiBold"
              isDisabled={fetching || !canSubmit}
              isLoading={fetching}
              loadingText="Enviando"
            >
              ENVIAR
            </Button>
          </form>
        </Container>
      )}
    </Modal>
  )
}
