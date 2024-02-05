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
        '3xl:ml-[250px]',
        'ultrawide:ml-[450px]',
        pathname === '/jogar' && 'px-[3.4%] py-10',
        pathname === '/jogar' && '3xl:py-8 3xl:px-[1.6%]'
      )}
    >
      {children}
    </section>
  )
}
