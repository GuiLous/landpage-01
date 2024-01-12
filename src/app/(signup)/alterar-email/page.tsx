'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { isEmailValid, revalidatePath } from '@/utils'

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
        .setExpirationTime('1h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken)

      setFetching(false)

      if (response.account.is_verified) {
        revalidatePath({ path: '/jogar' })

        return router.push('/jogar')
      }

      revalidatePath({ path: '/verificar' })

      return router.push('/verificar')
    },
    [email, router, showErrorToast, auth]
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

        <SignupChangeEmailGoBackLink />
      </div>
    </form>
  )
}
