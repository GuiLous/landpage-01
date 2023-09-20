'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { privacyPolicyLink, useTermsLink } from '@/utils'

import { isEmailValid } from '@/functions'

import { httpService, storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { updateUser } from '@/store/slices/userSlice'

import { Button, Input, Link } from '@/components/shared'

type FieldsErrors = {
  email: string
}

export default function SignUp() {
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

  const handleKeyEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      isEmailValid(email) && handleSubmit()
    }
  }

  const handleSubmit = async (e?: FormEvent) => {
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
    dispatch(
      addToast({
        title: 'Que bom que você chegou!',
        content: 'Agora falta pouco, verifique sua conta para começar a jogar!',
        variant: 'success',
      })
    )
    dispatch(updateUser(response))
    if (response.account) router.push('/verificar')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[430px] flex-col items-center gap-3 "
    >
      <Input.Root>
        <Input.Label htmlFor="email" label="E-mail" />

        <Input.Input
          value={email}
          placeholder="Seu email aqui"
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

        <p className="text-sm text-gray-300">
          Ao se cadastrar, você concorda com os{' '}
          <Link href={useTermsLink} inline>
            Termos de Uso
          </Link>{' '}
          e a{' '}
          <Link href={privacyPolicyLink} inline>
            Política de Privacidade
          </Link>
        </p>
      </div>
    </form>
  )
}
