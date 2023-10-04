'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

interface DrawerContent {
  title: string
  children: ReactNode
  className?: string
  showOverlay?: boolean
}

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

export function DrawerContent({
  title,
  children,
  className,
  showOverlay,
}: DrawerContent) {
  return (
    <Dialog.Portal>
      {showOverlay && (
        <Dialog.Overlay className="fixed inset-0 bg-black/[.85] data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      )}
      <Dialog.Content
        className={twMerge(
          'fixed right-0 top-0 flex w-full h-screen max-w-md flex-col bg-gray-900 py-6 shadow data-[state=closed]:animate-[drawer-content-hide_200ms] data-[state=open]:animate-[drawer-content-show_200ms]',
          className
        )}
      >
        <div className="flex-initial items-center justify-start">
          <Dialog.Title className="px-6 font-semibold capitalize leading-none text-white">
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

Drawer.Button = Dialog.Trigger
Drawer.Close = Dialog.Close
Drawer.Content = DrawerContent
