'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiArrowDownSLine, RiErrorWarningFill } from 'react-icons/ri'

import { fakeAccountEmails } from '@/utils'

import { isEmailValid } from '@/functions'

import { httpService } from '@/services'

import { SelectProvider } from '@/providers'

import { Button, Divider, Input, Select } from '@/components/shared'

import { useInitializeReducers, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export function FakeSignIn() {
  const { initializeReducers } = useInitializeReducers()
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
        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      setFetching(false)

      initializeReducers(response.token)

      router.push('/verificar')
    },
    [email, router, showErrorToast, initializeReducers]
  )

  if (process.env.NEXT_PUBLIC_REACT_APP_SHOW_FAKE_SIGNIN === 'false')
    return null

  return (
    <div className="max-w-[310px] flex-col">
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

              <SelectProvider>
                <Select.Root>
                  <Select.Wrapper>
                    <Select.Input onChange={handleChange} />

                    <Select.OptionSelectedWrapper>
                      <Select.OptionSelected placeholder="Selecione um email" />
                      <Select.RightIcon icon={RiArrowDownSLine} size={22} />
                    </Select.OptionSelectedWrapper>
                  </Select.Wrapper>

                  <Select.Options>
                    {fakeAccountEmails.map((email, index) => (
                      <Select.Option
                        key={email.value}
                        items={fakeAccountEmails}
                        item={email}
                        index={index}
                      />
                    ))}
                  </Select.Options>
                </Select.Root>
              </SelectProvider>

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
