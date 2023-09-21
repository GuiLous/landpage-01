'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { RiArrowDownSLine, RiErrorWarningFill } from 'react-icons/ri'

import { fakeAccoutnEmails } from '@/utils'

import { isEmailValid } from '@/functions'

import { httpService, storageService } from '@/services'

import { SelectProvider } from '@/providers'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { updateMatch } from '@/store/slices/matchSlice'
import { updatePreMatch } from '@/store/slices/preMatchSlice'

import { Button, Divider, Input, Select } from '@/components/shared'

type FieldsErrors = {
  email: string
}

export function FakeSignIn() {
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

      storageService.set('token', response.token)

      if (response.account) {
        if (response.account.pre_match) {
          dispatch(updatePreMatch(response.account.pre_match))
        } else if (response.account.match) {
          dispatch(updateMatch(response.account.match))
        }
      }

      router.push('/verificar')
    },
    [dispatch, email, router]
  )

  if (process.env.NEXT_PUBLIC_REACT_APP_SHOW_FAKE_SIGNIN === 'false')
    return null

  return (
    <div className="max-w-[310px] flex-col">
      <Divider />

      <div className="mt-[0.625rem] flex-col ">
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
                    {fakeAccoutnEmails.map((email, index) => (
                      <Select.Option
                        key={email.value}
                        items={fakeAccoutnEmails}
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

          <p className="p-[0.625rem] text-xs">
            *Disponível somente para testes.
          </p>
        </form>
      </div>
    </div>
  )
}
