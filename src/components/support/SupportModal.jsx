import { Button, Text, Textarea, VStack, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
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
import { addToast } from '@slices/AppSlice'
import { useDispatch } from 'react-redux'

export default function SupportModal({ isOpen, setIsOpen }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const dispatch = useDispatch()

  const [subjectOptions, setSubjectOptions] = useState([
    { value: null, label: 'Carregando opções...', disabled: true },
  ])
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

  const formatSubjectOptions = (options) => {
    const optionsFormatted = options.reduce((acc, currentValue) => {
      acc.push({ value: currentValue, label: currentValue })
      return acc
    }, [])

    return optionsFormatted
  }

  const handleCloseModalSupport = () => {
    reset()
    setIsOpen(false)
    setFormSent(false)
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

  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await SupportAPI.listTickets(userToken)

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
        return
      }

      setSubjectOptions(formatSubjectOptions(response))
    }

    if (isOpen) {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      title="SUPORTE RELOAD CLUB"
      onClose={handleCloseModalSupport}
      headerMarginBottom={formSent ? 32 : 24}
    >
      {formSent ? (
        <ConfirmationContent />
      ) : (
        <Container
          justify="center"
          align="center"
          column
          gap={isLessThan2xl ? 20 : 32}
        >
          <Text
            color="gray.300"
            fontSize={{ base: 14, md: 12, '2xl': 14 }}
            textAlign="center"
          >
            Tem alguma dúvida? Envie para nosso suporte e logo retornaremos.
          </Text>

          <form
            method="POST"
            onSubmit={handleSubmit(SubmitForm)}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: isLessThan2xl ? '10px' : '12px',
            }}
          >
            <Container
              column
              gap={isLessThan2xl ? 12 : 14}
              style={{ overflow: 'hidden' }}
            >
              <VStack alignItems="initial" w="100%">
                <Select
                  control={control}
                  options={subjectOptions}
                  isInvalid={fieldsErrors?.subject}
                />

                {fieldsErrors?.subject && (
                  <Text
                    fontSize={12}
                    color="red.500"
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
                  minH={{ base: '98px', md: '68px', '2xl': '98px' }}
                  {...register('description')}
                />

                {fieldsErrors?.description && (
                  <Text
                    fontSize={12}
                    color="red.500"
                    pl="5px"
                    mt="12px"
                    fontWeight="medium"
                  >
                    {fieldsErrors?.description}
                  </Text>
                )}
              </Container>

              <Container column>
                <FileInput
                  files={files}
                  register={register}
                  setValue={setValue}
                  setFieldsErrors={setFieldsErrors}
                />

                {fieldsErrors?.files && (
                  <Text
                    fontSize={12}
                    color="red.500"
                    pl="5px"
                    mt="12px"
                    fontWeight="medium"
                  >
                    {fieldsErrors?.files}
                  </Text>
                )}
              </Container>

              <Container
                align="center"
                justify="between"
                gap={isLessThan2xl ? 10 : 12}
                style={{ flexWrap: 'wrap', maxWidth: '410px' }}
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
