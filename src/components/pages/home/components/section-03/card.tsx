import { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  title: string
  description: string
  icon: ElementType
  iconColor: string
  iconBg: string
}

export function Card({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}: CardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-9 py-6">
      <div
        className={twMerge(
          'flex h-20 w-20 items-center justify-center rounded-full',
          iconBg
        )}
      >
        <Icon className={iconColor} size={40} />
      </div>

      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="text-center text-xl leading-relaxed">{description}</p>
    </div>
  )
}
