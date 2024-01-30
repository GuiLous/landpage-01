'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { isEmailValid } from '@/utils'

import { getJwtSecretKey, httpService } from '@/services'

import { useAppStore } from '@/store/appStore'

import { SignupRegisterTerms } from '@/components/pages'

import { Button, Input } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export default function SignUp() {
  const { addToast } = useAppStore()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(
    {} as FieldsErrors
  )

  const auth = useAuth()
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
      if (!auth?.token) return

      e?.preventDefault()

      setFetching(true)

      const payload = {
        email,
        policy: true,
        terms: true,
      }

      const response = await httpService.post(
        'accounts/',
        auth.token,
        payload,
        undefined,
        { cache: 'no-cache' }
      )

      if (response.fieldsErrors) {
        setFieldsErrors(response.fieldsErrors)
        setFetching(false)
        return
      } else if (response.errorMsg) {
        if (response.errorMsg === 'Usuário deve ser convidado.') {
          return router.push('/em-breve')
        }

        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      addToast({
        title: 'Que bom que você chegou!',
        content: 'Agora falta pouco, verifique sua conta para começar a jogar!',
        variant: 'success',
      })

      const jwtToken = await new SignJWT({
        ...auth,
        email: response.email,
        username: response.account.username,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken)

      setFetching(false)

      return router.push('/verificar')
    },
    [auth, email, addToast, router, showErrorToast]
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

        <SignupRegisterTerms />
      </div>
    </form>
  )
}
