'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { isEmailValid } from '@/functions'

import { httpService, storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { updateUser } from '@/store/slices/userSlice'

import { Terms } from '@/components/pages'

import { Button, Input } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export default function SignUp() {
  const dispatch = useAppDispatch()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(
    {} as FieldsErrors
  )

  const cannotSubmit = email !== '' && !isEmailValid(email)

  const isButtonDisabled = fetching || cannotSubmit || email === ''

  const handleChange = (value: string) => {
    setEmail(value)
  }

  const handleKeyEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      isEmailValid(email) && handleSubmit()
    }
  }

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault()

      setFetching(true)
      const token = storageService.get('token')

      const payload = {
        email,
        policy: true,
        terms: true,
      }

      const response = await httpService.post('accounts/', token, payload)
      if (response.fieldsErrors) {
        setFieldsErrors(response.fieldsErrors)
        setFetching(false)
        return
      } else if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      setFetching(false)
      dispatch(
        addToast({
          title: 'Que bom que você chegou!',
          content:
            'Agora falta pouco, verifique sua conta para começar a jogar!',
          variant: 'success',
        })
      )
      dispatch(updateUser(response))
      if (response.account) router.push('/verificar')
    },
    [dispatch, email, router, showErrorToast]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[430px] flex-col items-center gap-3 "
    >
      <Input.Root>
        <Input.Label htmlFor="email" label="E-mail" />

        <Input.Input
          value={email}
          placeholder="Seu e-mail aqui"
          type="email"
          id="email"
          autoComplete="true"
          onKeyDown={(e) => handleKeyEnterDown(e)}
          onChange={(e) => handleChange(e.target.value)}
          error={cannotSubmit || !!fieldsErrors.email}
        >
          {cannotSubmit && <Input.RightIcon icon={RiErrorWarningFill} error />}
        </Input.Input>

        {fieldsErrors.email && (
          <Input.ErrorText errorMsg={fieldsErrors.email} />
        )}
      </Input.Root>

      <div className="flex-col gap-2">
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
            Cadastrar
          </Button.Content>
        </Button.Root>

        <Terms />
      </div>
    </form>
  )
}
