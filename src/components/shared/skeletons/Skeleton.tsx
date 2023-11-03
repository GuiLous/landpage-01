import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonProps = ComponentProps<'div'>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        'flex-initial rounded max-w-fit animate-pulse bg-gray-700',
        className
      )}
      {...props}
    />
  )
}
