import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface SignupContentProps {
  children: ReactNode
}

export function SignupContent({ children }: SignupContentProps) {
  return (
    <section className="flex-col justify-between gap-10 bg-gray-1200 p-10">
      <div className="max-w-fit flex-initial border-b-4 border-b-purple-400 pb-3">
        <h2
          className={twMerge(
            'text-sm font-medium leading-none',
            'ultrawide:text-2xl'
          )}
        >
          Primeiro acesso
        </h2>
      </div>
      {children}
    </section>
  )
}
