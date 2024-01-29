'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { BsEnvelopeFill } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri'

import { isEmailValid, revalidatePath } from '@/utils'

import { getJwtSecretKey, httpService } from '@/services'

import { useAppStore } from '@/store/appStore'

import { SignupRegisterTerms } from '@/components/pages'

import { Button, CheckBox, Input } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export default function SignUp() {
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(
    {} as FieldsErrors
  )

  const auth = useAuth()
  const cannotSubmit = email !== '' && !isEmailValid(email)

  const isButtonDisabled =
    fetching || cannotSubmit || email === '' || !isChecked

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
      if (!auth?.token || isButtonDisabled) return

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
          revalidatePath({ path: '/em-breve' })
          return router.push('/em-breve')
        }

        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      useAppStore.getState().addToast({
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

      revalidatePath({ path: '/verificar' })

      setFetching(false)

      return router.push('/verificar')
    },
    [email, router, showErrorToast, auth]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-10"
    >
      <div className="flex-col gap-3">
        <Input.Root>
          <Input.Label
            className="text-sm font-normal leading-none"
            htmlFor="email"
            label="E-mail"
          />

          <Input.Input
            value={email}
            placeholder="Seu e-mail aqui"
            type="email"
            id="email"
            autoComplete="true"
            signup
            onKeyDown={(e) => handleKeyEnterDown(e)}
            onChange={(e) => handleChange(e.target.value)}
            error={cannotSubmit || !!fieldsErrors.email}
          >
            <Input.Icon
              icon={BsEnvelopeFill}
              className="left-3.5 text-gray-300"
            />

            {cannotSubmit && <Input.Icon icon={RiErrorWarningFill} error />}
          </Input.Input>

          {fieldsErrors.email && (
            <Input.ErrorText errorMsg={fieldsErrors.email} />
          )}
        </Input.Root>

        <div className="items-start gap-2.5">
          <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
          <SignupRegisterTerms />
        </div>
      </div>

      <Button.Root disabled={isButtonDisabled} className="w-full" type="submit">
        {fetching && <Button.Spinner />}

        <Button.Content
          disabled={isButtonDisabled}
          isLoading={fetching}
          className="text-sm font-semibold"
        >
          Cadastrar
        </Button.Content>
      </Button.Root>
    </form>
  )
}
