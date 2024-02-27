'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { useAudio } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

type Position = 'left' | 'right'

interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

interface DrawerContent extends Dialog.DialogContentProps {
  title: string
  children: ReactNode
  className?: string
  showOverlay?: boolean
  position?: Position
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
  position = 'right',
  ...props
}: DrawerContent) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  return (
    <Dialog.Portal>
      {showOverlay && (
        <Dialog.Overlay
          className={twMerge(
            'fixed inset-0 bg-black/[.85]',
            'data-[state=closed]:animate-[dialog-overlay-hide_200ms]',
            'data-[state=open]:animate-[dialog-overlay-show_200ms]'
          )}
        />
      )}
      <Dialog.Content
        className={twMerge(
          'fixed right-0 top-0 flex w-full h-screen flex-col bg-gray-900 py-6 shadow',
          'data-[state=closed]:animate-[drawer-content-hide-right_200ms]',
          'data-[state=open]:animate-[drawer-content-show-right_200ms]',
          position === 'left' &&
            'data-[state=closed]:animate-[drawer-content-hide-left_200ms] data-[state=open]:animate-[drawer-content-show-left_200ms] left-0',
          className
        )}
        {...props}
      >
        <div className="flex-initial items-center justify-start">
          <Dialog.Title
            className={twMerge(
              'px-5 font-semibold capitalize leading-none text-white',
              'ultrawide:text-xl'
            )}
          >
            {title}
          </Dialog.Title>
        </div>
        <Dialog.Close
          onMouseEnter={playSoundHover}
          onClick={playSoundClick}
          className={twMerge(
            'absolute right-3 top-3 text-base text-white transition-colors',
            'hover:text-gray-300',
            'ultrawide:text-xl'
          )}
        >
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
