'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Wrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <section
      className={twMerge(
        'ml-[300px] select-none',
        '3xl:ml-[250px] 3xl:px-[1.6%] 3xl:py-8',
        pathname === '/jogar' && 'px-[3.4%] py-10'
      )}
    >
      {children}
    </section>
  )
}
