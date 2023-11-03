import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ProfileCardProps {
  title?: string
  children: ReactNode
}

export function ProfileCard({ children, title }: ProfileCardProps) {
  return (
    <section
      className={twMerge(
        'flex-col gap-9 bg-gray-1000 rounded p-6',
        '3xl:gap-7 3xl:p-5'
      )}
    >
      {title && (
        <div>
          <h3 className="font-bold uppercase text-white">{title}</h3>
        </div>
      )}

      <div>{children}</div>
    </section>
  )
}
