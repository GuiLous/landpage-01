'use client'

import * as PrimitiveScrollArea from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ScrollAreaProps {
  children: ReactNode
  className?: string
}

export function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <PrimitiveScrollArea.Root
      className={twMerge('max-h-screen overflow-hidden', className)}
    >
      <PrimitiveScrollArea.Viewport className="h-full w-full">
        {children}
      </PrimitiveScrollArea.Viewport>
      <PrimitiveScrollArea.Scrollbar
        className="flex min-w-[10px] touch-none select-none rounded bg-black/10 transition-colors duration-[160ms] ease-out  data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <PrimitiveScrollArea.Thumb className="relative min-w-[10px] flex-1 rounded bg-black/40 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </PrimitiveScrollArea.Scrollbar>
      <PrimitiveScrollArea.Scrollbar
        className="flex min-w-[10px] touch-none select-none rounded bg-black/10 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <PrimitiveScrollArea.Thumb className="relative min-w-[10px] flex-1 rounded bg-black/40 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </PrimitiveScrollArea.Scrollbar>
    </PrimitiveScrollArea.Root>
  )
}
