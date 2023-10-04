'use client'

import {
  ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'

interface PinInputRootProps extends ComponentProps<'input'> {
  inputs: number
  onChangeValue?: (value: string) => void
  onPressKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

let currentOTPIndex = 0

export function PinInput({
  inputs,
  onChangeValue,
  onPressKeyDown,
  className,
}: PinInputRootProps) {
  const [otp, setOtp] = useState<string[]>(new Array(inputs).fill(''))
  const [activeOTPIndex, setActiveOTPIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const addValueToNextEmptyPosition = useCallback(
    (value: string) => {
      const newArray = [...otp]

      const emptyIndex = newArray.findIndex((pin) => pin === '')

      if (emptyIndex !== -1) {
        newArray[emptyIndex] = value

        setOtp(newArray)
      }

      if (activeOTPIndex === 5) {
        newArray[currentOTPIndex] = value
        setOtp(newArray)
      }
    },
    [activeOTPIndex, otp]
  )

  const removeValueToLastPosition = useCallback(() => {
    const newArray = [...otp]

    const lastNotEmptyIndex = newArray.findLastIndex((pin) => pin !== '')

    if (lastNotEmptyIndex !== -1) {
      newArray[lastNotEmptyIndex] = ''

      setOtp(newArray)
    }
  }, [otp])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    const newOTP = [...otp]

    if (value.length > 1 && currentOTPIndex < 5) {
      newOTP.forEach((_, index) => {
        newOTP[index] = value.charAt(index)
      })
      setActiveOTPIndex(newOTP.length - 1)
      setOtp(newOTP)
      currentOTPIndex = 5
    } else {
      addValueToNextEmptyPosition(value.substring(value.length - 1))

      if (!value) setActiveOTPIndex(currentOTPIndex - 1)
      else setActiveOTPIndex(currentOTPIndex)
    }
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (currentOTPIndex < 5) {
      currentOTPIndex += 1
    }

    if (e.key === 'Backspace') {
      removeValueToLastPosition()
      setActiveOTPIndex((prevState) => prevState - 1)
      currentOTPIndex = activeOTPIndex
    }

    if (onPressKeyDown) {
      onPressKeyDown(e)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPIndex, otp])

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(otp.join(''))
    }
  }, [onChangeValue, otp])

  return (
    <>
      {otp.map((_, index) => (
        <input
          key={index}
          ref={index === activeOTPIndex ? inputRef : null}
          type="text"
          className={twMerge(
            'pin-button-none h-14 w-14 rounded-md border-none bg-white text-center text-[1.625rem] font-medium text-gray-700 outline-none transition focus:ring-1 focus:ring-purple-400',
            className
          )}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          value={otp[index]}
        />
      ))}
    </>
  )
}
