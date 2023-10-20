'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ContentProps = ComponentProps<typeof Select.Content>

export function Content({ children, ...props }: ContentProps) {
  return (
    <Select.Portal>
      <Select.Content
        {...props}
        sideOffset={0}
        side="bottom"
        position="popper"
        className={twMerge(
          'z-50 overflow-hidden rounded bg-gray-800',
          'will-change-[opacity,transform]',
          'group',
          'animate-slide-up-fade',
          'w-[var(--radix-select-trigger-width)]'
        )}
      >
        <ScrollArea.Root className="h-full w-full" type="auto">
          <Select.Viewport className="max-h-[300px]" asChild>
            <ScrollArea.Viewport className="h-full w-full overflow-y-scroll">
              {children}
            </ScrollArea.Viewport>
          </Select.Viewport>

          <ScrollArea.Scrollbar
            className={twMerge(
              'flex min-w-[10px] touch-none select-none rounded bg-black/10',
              'transition-colors duration-[160ms] ease-out',
              'data-[orientation=horizontal]:h-2.5',
              'data-[orientation=vertical]:w-2.5',
              'data-[orientation=horizontal]:flex-col'
            )}
            orientation="vertical"
          >
            <ScrollArea.Thumb
              className={twMerge(
                'relative min-w-[10px] flex-1 rounded bg-black/40 ',
                "before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']"
              )}
            />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Select.Content>
    </Select.Portal>
  )
}
