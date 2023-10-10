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
}

export function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

function ModalContent({ title, children, className }: ModalContent) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/[.85] data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      <Dialog.Content
        className={twMerge(
          'fixed left-1/2 top-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-gray-1000 p-10 text-gray-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms] 3xl:p-8',
          className
        )}
      >
        <div className="items-center justify-center">
          <Dialog.Title className="text-xl font-bold leading-none text-white 3xl:text-lg">
            {title}
          </Dialog.Title>
        </div>
        <Dialog.Close className="absolute right-3 top-3 text-base text-white transition-colors hover:text-gray-300">
          <RxCross1 className="" />
        </Dialog.Close>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
