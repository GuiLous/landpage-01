'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { isEmailValid } from '@/functions'

import { httpService, storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { updateUser } from '@/store/slices/userSlice'

import { Button, Input, Link } from '@/components/shared'

type FieldsErrors = {
  email: string
}

export default function ChangeEmail() {
  const dispatch = useAppDispatch()

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
      }

      const response = await httpService.patch(
        'accounts/update-email/',
        token,
        payload
      )
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

      setFetching(false)

      dispatch(updateUser(response))

      if (response.account.is_verified) router.push('/jogar')

      router.push('/verificar')
    },
    [dispatch, email, router]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-14 flex w-full max-w-[430px] flex-col items-center gap-3 "
    >
      <Input.Root>
        <Input.Label htmlFor="email" label="Altere seu e-mail" />

        <Input.Input
          value={email}
          placeholder="exemplo@email.com"
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

      <div className="flex-col gap-3">
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
            Alterar e-mail
          </Button.Content>
        </Button.Root>

        <div className="items-center justify-center">
          <Link href="/verificar">Cancelar e voltar</Link>
        </div>
      </div>
    </form>
  )
}
