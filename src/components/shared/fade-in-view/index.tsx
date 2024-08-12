'use client'

import { ReactElement } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  children: ReactElement
}

export function FadeInUpComponent({ children }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    delay: 300,
  })

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 will-change-transform ${inView ? 'animate-fade_in_up opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}
