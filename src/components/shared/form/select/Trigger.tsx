'use client'

import * as Select from '@radix-ui/react-select'
import { ComponentProps } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

export type TriggerProps = ComponentProps<typeof Select.Trigger> & {
  error?: boolean
}

export function Trigger({ children, error = false, ...props }: TriggerProps) {
  return (
    <Select.Trigger
      {...props}
      className={twMerge(
        'flex w-full items-center text-xs text-gray-300 bg-gray-1200 justify-between gap-2 rounded border border-gray-700 px-3 py-2 outline-none',
        'group',
        'data-[placeholder]:text-gray-300',
        'focus:border-purple-400 focus:border',
        'hover:border hover:border-purple-400',
        error && 'border-red-500 hover:border-red-500',
        props.className
      )}
    >
      {children}

      <Select.Icon>
        <RiArrowDownSLine
          className={twMerge(
            'h-5 w-5 text-gray-300',
            'transition-transform',
            'group-data-[state=open]:rotate-180',
            'group-data-[state=open]:text-white'
          )}
        />
      </Select.Icon>
    </Select.Trigger>
  )
}
