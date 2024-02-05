'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { BsEnvelopeFill } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { isEmailValid } from '@/utils'

import { getJwtSecretKey, httpService } from '@/services'

import { SignupChangeEmailGoBackLink } from '@/components/pages'

import { Button, Input } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export default function ChangeEmail() {
  const router = useRouter()
  const showErrorToast = useShowErrorToast()

  const auth = useAuth()

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
      if (!auth?.token) return

      e?.preventDefault()

      setFetching(true)

      const payload = {
        email,
      }

      const response = await httpService.patch(
        'accounts/update-email/',
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
        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      const jwtToken = await new SignJWT({
        ...auth,
        email,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken)

      setFetching(false)

      if (response.account.is_verified) {
        return router.push('/jogar')
      }

      return router.push('/verificar')
    },
    [email, router, showErrorToast, auth]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col items-center gap-3 "
    >
      <div className="flex-initial flex-col gap-3">
        <Input.Root>
          <Input.Label
            className="text-sm font-normal leading-none"
            htmlFor="email"
            label="Altere seu e-mail"
          />

          <Input.Input
            value={email}
            placeholder="exemplo@email.com"
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
              className={twMerge('left-3.5 text-gray-300', 'ultrawide:left-6')}
            />

            {cannotSubmit && <Input.Icon icon={RiErrorWarningFill} error />}
          </Input.Input>

          {fieldsErrors.email && (
            <Input.ErrorText errorMsg={fieldsErrors.email} />
          )}
        </Input.Root>

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
      </div>

      <SignupChangeEmailGoBackLink />
    </form>
  )
}
