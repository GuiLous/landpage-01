'use client'

import { SignJWT } from 'jose'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { PiArrowRight } from 'react-icons/pi'

import { TOTAL_SIGNUP_PINS } from '@/constants'

import { getJwtSecretKey, httpService } from '@/services'

import { Button, PinInput } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function VerifyForm() {
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const getAuth = useAuth()
  const auth = getAuth()

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
        payload
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
        is_verified: response.account.is_verified,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(getJwtSecretKey())

      cookies.set('token', jwtToken, { path: '/' })

      setFetching(false)

      router.push('/jogar')
    },
    [cannotSubmit, pin, showErrorToast, auth, router]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-initial items-center justify-center gap-2.5"
    >
      <PinInput
        inputs={TOTAL_SIGNUP_PINS}
        onChangeValue={handleChange}
        onPressKeyDown={handleKeyEnterDown}
      />

      <Button.Root
        disabled={isButtonDisabled}
        className="h-14 w-14"
        type="submit"
      >
        {fetching ? (
          <Button.Spinner />
        ) : (
          <Button.Icon
            icon={PiArrowRight}
            disabled={isButtonDisabled}
            className="text-3xl"
          />
        )}
      </Button.Root>
    </form>
  )
}
