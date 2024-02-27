'use client'

import * as Checkbox from '@radix-ui/react-checkbox'
import { BiCheck } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

interface CheckBoxProps {
  label?: string
  isChecked: boolean
  setIsChecked: (state: boolean) => void
}

export function CheckBox({ label, isChecked, setIsChecked }: CheckBoxProps) {
  return (
    <div className="flex max-w-fit flex-initial items-center">
      <Checkbox.Root
        className={twMerge(
          'flex border border-purple-400 h-4 w-4 appearance-none items-center justify-center rounded-sm bg-gray-1200 outline-none',
          'focus:outline focus:outline-1 focus:outline-white',
          'ultrawide:h-8 ultrawide:w-8'
        )}
        checked={isChecked}
        onCheckedChange={() => setIsChecked(!isChecked)}
        id="c1"
      >
        <Checkbox.Indicator
          className={twMerge('text-white', 'ultrawide:text-2xl')}
        >
          <BiCheck />
        </Checkbox.Indicator>
      </Checkbox.Root>

      {label && (
        <label
          className="pl-[15px] text-[15px] leading-none text-white"
          htmlFor="c1"
        >
          {label}
        </label>
      )}
    </div>
  )
}
