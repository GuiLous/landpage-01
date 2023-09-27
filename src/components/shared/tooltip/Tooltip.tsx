'use client'

import * as PrimitiveTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
  delay?: number
}

export function Tooltip({ content, children, delay = 300 }: TooltipProps) {
  return (
    <PrimitiveTooltip.Provider>
      <PrimitiveTooltip.Root delayDuration={delay}>
        <PrimitiveTooltip.Trigger asChild>{children}</PrimitiveTooltip.Trigger>

        <PrimitiveTooltip.Portal>
          <PrimitiveTooltip.Content
            sideOffset={0}
            className="inline-flex w-full items-center bg-gray-1000 px-2 py-1.5 radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade radix-side-right:animate-slide-left-fade radix-side-top:animate-slide-down-fade"
          >
            <PrimitiveTooltip.Arrow className="fill-gray-1000 text-red-300" />

            <span className="block text-sm font-semibold leading-none text-white">
              {content}
            </span>
          </PrimitiveTooltip.Content>
        </PrimitiveTooltip.Portal>
      </PrimitiveTooltip.Root>
    </PrimitiveTooltip.Provider>
  )
}
