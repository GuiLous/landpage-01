'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react'
import { BiSolidLock } from 'react-icons/bi'
import { RiCheckboxCircleFill, RiErrorWarningFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { isEmailValid, revalidatePath } from '@/utils'

import { getJwtSecretKey } from '@/services'

import { useAppStore } from '@/store/appStore'
import { useUserStore } from '@/store/userStore'

import { accountsApi } from '@/modelsApi'

import { Button, Input, ProfileCard } from '@/components/shared'

import { useAuth, useOutsideClick, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

export function AccountChangeEmailCard() {
  const { updateUser } = useUserStore()
  const { addToast } = useAppStore()

  const router = useRouter()

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [email, setEmail] = useState(auth?.email || '')
  const [fetching, setFetching] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const showError =
    (!isEmailValid(email) && email !== '') || !!fieldsErrors?.email

  const showSuccess =
    isEmailValid(email) && email !== '' && email !== auth?.email

  const isButtonDisabled = showError || email === '' || email === auth?.email

  const changeEmailIfHasNotChanged = useCallback(() => {
    email === auth?.email && setEmail('')
    setIsEditing(true)
  }, [auth?.email, email])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (
      fieldsErrors !== null &&
      fieldsErrors.email &&
      value !== fieldsErrors.email
    ) {
      setFieldsErrors(null)
    }

    setEmail(value)
  }

  const handleOutsideClick = useCallback(() => {
    setIsEditing(false)
    setFieldsErrors(null)

    let isCurrentEmailValid = false

    if (email === '' && auth?.email) {
      setEmail(auth.email)
      isCurrentEmailValid = isEmailValid(auth.email)
    } else {
      isCurrentEmailValid = isEmailValid(email)
    }

    if (!isCurrentEmailValid) {
      changeEmailIfHasNotChanged()

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [auth?.email, changeEmailIfHasNotChanged, email])

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (e) {
        e.preventDefault()
      }

      if (!auth?.token) return
      setFetching(true)

      const response = await accountsApi.updateEmail(auth.token, email)

      if (response.fieldsErrors) {
        setFieldsErrors(response.fieldsErrors)
        return
      } else if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      const jwtToken = await new SignJWT({
        ...auth,
        email,
        is_verified: false,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken)

      updateUser(response)

      addToast({
        title: 'E-mail atualizado com sucesso!',
        variant: 'success',
      })

      revalidatePath({ path: '/verificar' })

      return router.push('/verificar')
    },
    [auth, email, updateUser, addToast, router, showErrorToast]
  )

  useOutsideClick({ ref: inputRef, handler: handleOutsideClick })

  return (
    <ProfileCard
      title="INFORMAÇÕES PESSOAIS"
      description="Essa informação é particular e não será compartilhada com outras pessoas."
      icon={BiSolidLock}
      variant="account"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-1 flex-col gap-8"
      >
        <section className="max-w-[424px]">
          <Input.Root>
            <Input.Label
              htmlFor="email"
              label="E-mail"
              className="text-sm font-medium text-gray-300"
            />

            <Input.Input
              forwardRef={inputRef}
              secondary
              type="email"
              id="email"
              value={email}
              error={showError}
              success={showSuccess}
              onChange={handleChange}
              onClick={changeEmailIfHasNotChanged}
              className={twMerge(
                'text-sm px-4',
                email === auth?.email &&
                  'text-gray-300 transition-colors focus:text-white'
              )}
            >
              {showError && (
                <Input.RightIcon
                  icon={RiErrorWarningFill}
                  error
                  size={22}
                  className="right-3.5"
                />
              )}
              {showSuccess && (
                <Input.RightIcon
                  icon={RiCheckboxCircleFill}
                  success
                  size={22}
                  className="right-3.5"
                />
              )}

              {auth?.email === email && !isEditing && (
                <span className="absolute right-3.5 top-1/2 -translate-y-2/4 text-sm font-medium text-gray-400">
                  EDITAR
                </span>
              )}
            </Input.Input>

            {fieldsErrors?.email && (
              <Input.ErrorText errorMsg={fieldsErrors.email} />
            )}
          </Input.Root>
        </section>

        <Button.Root
          disabled={isButtonDisabled}
          className="w-full min-w-[86px] max-w-fit px-3"
          type="submit"
        >
          {fetching && <Button.Spinner />}

          <Button.Content
            disabled={isButtonDisabled}
            isLoading={fetching}
            className="text-sm font-semibold"
            loadingText="Salvando"
          >
            Salvar
          </Button.Content>
        </Button.Root>
      </form>
    </ProfileCard>
  )
}
