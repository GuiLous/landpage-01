'use client'

import * as PrimitiveTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Position = 'bottom' | 'left' | 'right' | 'top'

interface TooltipProps {
  children: ReactNode
  content: string
  delay?: number
  side?: Position
  asChild?: boolean
  open?: boolean
  className?: string
}

export function Tooltip({
  content,
  children,
  delay = 0,
  side = 'top',
  asChild = true,
  open,
  className,
}: TooltipProps) {
  return (
    <PrimitiveTooltip.Provider>
      <PrimitiveTooltip.Root delayDuration={delay} open={open}>
        <PrimitiveTooltip.Trigger asChild={asChild}>
          {children}
        </PrimitiveTooltip.Trigger>

        {content && (
          <PrimitiveTooltip.Portal>
            <PrimitiveTooltip.Content
              sideOffset={0}
              className={twMerge(
                'z-50 inline-flex w-full rounded-sm items-center bg-gray-700/50 px-2 py-1.5',
                'radix-side-bottom:animate-slide-up-fade',
                'radix-side-left:animate-slide-right-fade',
                'radix-side-right:animate-slide-left-fade',
                'radix-side-top:animate-slide-down-fade'
              )}
              side={side}
            >
              <PrimitiveTooltip.Arrow className="fill-gray-700/50" />

              <span
                className={twMerge(
                  'block text-sm font-semibold text-white',
                  'leading-none',
                  'ultrawide:text-xl',
                  className
                )}
              >
                {content}
              </span>
            </PrimitiveTooltip.Content>
          </PrimitiveTooltip.Portal>
        )}
      </PrimitiveTooltip.Root>
    </PrimitiveTooltip.Provider>
  )
}
