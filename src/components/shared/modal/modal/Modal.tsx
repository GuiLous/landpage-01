'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

interface ModalContent {
  title: string
  children: ReactNode
  className?: string
  showCloseButton?: boolean
  justifyTitle?: 'start' | 'center' | 'end'
}

export function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

function ModalContent({
  title,
  children,
  className,
  justifyTitle = 'center',
  showCloseButton = true,
}: ModalContent) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={twMerge(
          'fixed backdrop-blur-sm inset-0 z-40 bg-black/[.85]',
          'data-[state=closed]:animate-[dialog-overlay-hide_200ms]',
          'data-[state=open]:animate-[dialog-overlay-show_200ms]'
        )}
      />
      <Dialog.Content
        className={twMerge(
          'z-50 fixed left-1/2 top-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-gray-1000 p-10 text-gray-900 shadow',
          'data-[state=closed]:animate-[dialog-content-hide_200ms]',
          'data-[state=open]:animate-[dialog-content-show_200ms]',
          '3xl:p-8',
          className
        )}
      >
        <div
          className={twMerge(
            'items-center justify-center',
            justifyTitle === 'start' && 'justify-start',
            justifyTitle === 'end' && 'justify-end'
          )}
        >
          <Dialog.Title
            className={twMerge(
              'text-xl font-bold leading-none text-white',
              '3xl:text-lg'
            )}
          >
            {title}
          </Dialog.Title>
        </div>

        {showCloseButton && (
          <Dialog.Close
            className={twMerge(
              'absolute right-3 top-3 text-base text-white transition-colors',
              'hover:text-gray-300'
            )}
          >
            <RxCross1 />
          </Dialog.Close>
        )}

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
