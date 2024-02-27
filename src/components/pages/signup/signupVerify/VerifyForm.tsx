'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import { PiArrowRight } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

import { TOTAL_SIGNUP_PINS } from '@/constants'

import { getJwtSecretKey, httpService } from '@/services'

import { Button, PinInput } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface VerifyFormProps {
  children?: ReactNode
}

export function VerifyForm({ children }: VerifyFormProps) {
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const auth = useAuth()

  const [pin, setPin] = useState('')
  const [fetching, setFetching] = useState(false)

  const cannotSubmit = pin === '' || pin.length < TOTAL_SIGNUP_PINS

  const isButtonDisabled = fetching || cannotSubmit

  const handleChange = useCallback((value: string) => {
    setPin(value)
  }, [])

  const handleKeyEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (cannotSubmit || !auth?.token) return

      e?.preventDefault()

      setFetching(true)

      const payload = { verification_token: pin }

      const response = await httpService.post(
        'accounts/verify/',
        auth.token,
        payload,
        undefined,
        { cache: 'no-cache' }
      )

      if (response.fieldsErrors) {
        setFetching(false)
        return
      } else if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setFetching(false)
        return
      }

      const jwtToken = await new SignJWT({
        ...auth,
        is_verified: true,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken)

      return router.push('/jogar')
    },
    [cannotSubmit, pin, showErrorToast, auth, router]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge(
        'flex w-full flex-initial flex-col items-center justify-center gap-10',
        'ultrawide:gap-14'
      )}
    >
      <div className={twMerge('flex-col gap-6', 'ultrawide:gap-12')}>
        <PinInput
          inputs={TOTAL_SIGNUP_PINS}
          className={twMerge(
            'ultrawide:w-20 ultrawide:h-20 ultrawide:text-5xl'
          )}
          onChangeValue={handleChange}
          onPressKeyDown={handleKeyEnterDown}
        />

        {children}
      </div>

      <Button.Root
        disabled={isButtonDisabled}
        className={twMerge('w-full max-h-[42px] min-h-[42px]')}
        type="submit"
      >
        {fetching ? (
          <Button.Spinner />
        ) : (
          <Button.Icon
            icon={PiArrowRight}
            disabled={isButtonDisabled}
            className={twMerge('text-3xl')}
          />
        )}
      </Button.Root>
    </form>
  )
}
