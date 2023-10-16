'use client'

import { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import { PiArrowRight } from 'react-icons/pi'

import { TOTAL_SIGNUP_PINS } from '@/constants'

import { httpService, storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { updateUser } from '@/store/slices/userSlice'

import { Button, PinInput } from '@/components/shared'

export function VerifyForm() {
  const dispatch = useAppDispatch()

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
      if (cannotSubmit) return

      e?.preventDefault()

      setFetching(true)
      const token = storageService.get('token')

      const payload = { verification_token: pin }

      const response = await httpService.post(
        'accounts/verify/',
        token,
        payload
      )

      if (response.fieldsErrors) {
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

      dispatch(updateUser(response))
      setFetching(false)
    },
    [cannotSubmit, dispatch, pin]
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
