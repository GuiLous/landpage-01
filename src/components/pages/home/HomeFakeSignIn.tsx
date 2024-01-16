'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { fakeAccountEmails, isEmailValid, revalidatePath } from '@/utils'

import { getJwtSecretKey, httpService } from '@/services'

import { Button, Divider, Input, Select } from '@/components/shared'

import { useInitializeSlices, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export function HomeFakeSignIn() {
  const { initializeSlices } = useInitializeSlices()
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
      e && e.preventDefault()

      setFetching(true)

      const payload = { email }

      const response = await httpService.post(
        'accounts/fake-signup/',
        null,
        payload
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

      const jwtToken = await new SignJWT({
        id: response.id,
        email: response.email,
        username: response?.account?.username || null,
        is_active: response.is_active,
        is_verified: response?.account?.is_verified || false,
        token: response.token,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken)

      initializeSlices()

      if (!response.is_active) {
        revalidatePath({ path: '/conta-inativa' })
        return router.push('/conta-inativa')
      }

      if (!response?.account?.username) {
        revalidatePath({ path: '/cadastrar' })
        return router.push('/cadastrar')
      }

      if (!response?.account?.is_verified) {
        revalidatePath({ path: '/verificar' })
        return router.push('/verificar')
      }

      revalidatePath({ path: '/jogar' })
      return router.push('/jogar')
    },
    [email, router, showErrorToast, initializeSlices]
  )

  if (process.env.NEXT_PUBLIC_REACT_APP_SHOW_FAKE_SIGNIN === 'false')
    return null

  return (
    <div className="max-w-[452px] flex-initial flex-col">
      <Divider />

      <div className="mt-2.5 flex-col ">
        <form onSubmit={handleSubmit} className="w-full" method="POST">
          <div className="flex-col">
            <div className="flex-col gap-2">
              <Input.Root>
                <Input.Label htmlFor="email" label="Entrar sem Steam" />

                <Input.Input
                  placeholder="exemplo@email.com"
                  type="email"
                  id="email"
                  autoComplete="true"
                  onKeyDown={(e) => handleKeyEnterDown(e)}
                  onChange={(e) => handleChange(e.target.value)}
                  error={cannotSubmit || !!fieldsErrors.email}
                >
                  {cannotSubmit && (
                    <Input.RightIcon icon={RiErrorWarningFill} error />
                  )}
                </Input.Input>

                {fieldsErrors.email && (
                  <Input.ErrorText errorMsg={fieldsErrors.email} />
                )}
              </Input.Root>

              <div className="items-center justify-center">
                <span className="font-medium">ou</span>
              </div>

              <Select.Root name="Assunto" onValueChange={handleChange}>
                <Select.Trigger
                  className="text-sm"
                  error={!!fieldsErrors.email}
                >
                  <Select.Value placeholder="Selecione um email" />
                </Select.Trigger>

                <Select.Content>
                  {fakeAccountEmails.map((email) => (
                    <Select.Item key={email.value} value={email.value}>
                      <Select.ItemText className="text-sm">
                        {email.label}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <div>
                <Button.Root disabled={isButtonDisabled} className="w-full">
                  {fetching && <Button.Spinner />}

                  <Button.Content
                    disabled={isButtonDisabled}
                    isLoading={fetching}
                    className="text-sm font-semibold"
                  >
                    Entrar
                  </Button.Content>
                </Button.Root>
              </div>
            </div>
          </div>

          <p className="p-2.5 text-xs">*Disponível somente para testes.</p>
        </form>
      </div>
    </div>
  )
}
