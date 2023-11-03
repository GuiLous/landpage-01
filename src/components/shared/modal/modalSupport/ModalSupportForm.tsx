'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { formatSubjectOptions } from '@/utils'

import { supportApi } from '@/modelsApi'

import {
  Button,
  ErrorMessage,
  FileCard,
  FileInput,
  Select,
  TextArea,
} from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

type SubjectOptions = {
  value: string
  label: string
  disabled?: boolean
}

type FieldsErrors = {
  subject?: string | null
  description?: string | null
  files?: string | null
}

interface ModalSupportFormProps {
  open: boolean
  username?: string
  user_id?: number
  setFormSent: (state: boolean) => void
}

export function ModalSupportForm({
  open,
  user_id,
  username,
  setFormSent,
}: ModalSupportFormProps) {
  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [subjectOptions, setSubjectOptions] = useState<SubjectOptions[]>([
    { value: '', label: 'Carregando opções...', disabled: true },
  ])
  const [fetching, setFetching] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(
    {} as FieldsErrors
  )

  const cannotSubmit = description === '' || subject === ''

  const isButtonDisabled = fetching || cannotSubmit

  const reset = () => {
    setSubject('')
    setDescription('')
    setFiles([])
  }

  const handleChangeSelect = (value: string) => {
    setSubject(value)
  }

  const handleChangeDescription = (value: string) => {
    setDescription(value)
  }

  const onRemoveFiles = (fileName: string) => {
    const filesFiltered = files.filter((file) => file.name !== fileName)

    setFiles(filesFiltered)
  }

  const onCloseModalSupport = useCallback(() => {
    reset()
    setFormSent(false)
  }, [setFormSent])

  const getTickets = useCallback(async () => {
    if (!auth?.token) return

    const response = await supportApi.listTickets(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!user_id) {
      const subjectsFiltered = response.filter(
        (subject: string) => subject !== 'Reportar um usuário'
      )
      setSubjectOptions(formatSubjectOptions(subjectsFiltered))
      return
    }

    setSubjectOptions(formatSubjectOptions(response))
  }, [showErrorToast, user_id, auth])

  const submitForm = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!auth?.token) return

      setFetching(true)

      const formData: any = new FormData()

      formData.append('description', description)
      formData.append('subject', subject)
      user_id && formData.append('report_user_id', user_id)

      for (const file of files) {
        formData.append('files', file)
      }

      const response = await supportApi.createTicket(auth.token, formData)

      if (response.fieldsErrors) {
        setFieldsErrors(response.fieldsErrors)
        setFetching(false)
        return
      } else if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      setFormSent(true)
      reset()
      setFetching(false)
    },
    [description, files, subject, showErrorToast, user_id, setFormSent, auth]
  )

  useEffect(() => {
    if (open) {
      getTickets()
    }
  }, [open, getTickets])

  useEffect(() => {
    if (username && subjectOptions.length > 2) {
      setSubject('Reportar um usuário')
      setDescription(`Quero reportar o usuário "${username}"`)
    }
  }, [username, subjectOptions])

  useEffect(() => {
    if (!open) {
      onCloseModalSupport()
    }
  }, [open, onCloseModalSupport])

  return (
    <form
      onSubmit={submitForm}
      className={twMerge('flex w-full flex-col gap-3', '3xl:gap-2.5')}
    >
      <div className={twMerge('flex-col gap-10', '3xl:gap-7')}>
        <div className={twMerge('flex-col gap-4', '3xl:gap-2')}>
          <div className="flex-col gap-3">
            <Select.Root
              name="Assunto"
              value={subject}
              onValueChange={handleChangeSelect}
            >
              <Select.Trigger error={!!fieldsErrors.subject}>
                <Select.Value placeholder="Assunto" />
              </Select.Trigger>

              <Select.Content>
                {subjectOptions.map((subject) => (
                  <Select.Item key={subject.value} value={subject.label}>
                    <Select.ItemText>{subject.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            {fieldsErrors?.subject && (
              <ErrorMessage>{fieldsErrors?.subject}</ErrorMessage>
            )}
          </div>

          <div className="flex-col">
            <TextArea
              value={description}
              placeholder="Descrição"
              error={!!fieldsErrors.description}
              onChange={(e) => handleChangeDescription(e.target.value)}
            />

            {fieldsErrors?.description && (
              <ErrorMessage>{fieldsErrors?.description}</ErrorMessage>
            )}
          </div>

          <div className="flex-col">
            <FileInput
              files={files}
              setFieldsErrors={setFieldsErrors}
              setFiles={setFiles}
              error={!!fieldsErrors.files}
            />

            {fieldsErrors?.files && (
              <ErrorMessage>{fieldsErrors?.files}</ErrorMessage>
            )}
          </div>

          {files.length > 0 && (
            <div
              className={twMerge(
                'flex-wrap items-center justify-between gap-3',
                '3xl:gap-1.5'
              )}
            >
              {files.map((file, index) => (
                <FileCard
                  key={index}
                  file={file}
                  onRemoveFiles={onRemoveFiles}
                />
              ))}
            </div>
          )}
        </div>

        <Button.Root
          disabled={isButtonDisabled}
          className="w-full"
          type="submit"
        >
          {fetching && <Button.Spinner />}

          <Button.Content
            disabled={isButtonDisabled}
            isLoading={fetching}
            className="text-sm font-semibold"
          >
            Enviar
          </Button.Content>
        </Button.Root>
      </div>
    </form>
  )
}
