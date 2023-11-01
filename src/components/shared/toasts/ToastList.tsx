'use client'

import { animated as a, easings, useTransition } from '@react-spring/web'

import { useAppSelector } from '@/store'

import { Toast } from './Toast'

export function ToastList() {
  const toasts = useAppSelector((state) => state.app.toasts)

  const transitions = useTransition(toasts, {
    from: { opacity: 0, right: -40 },
    enter: { opacity: 1, right: 0 },
    leave: { opacity: 0, right: -40 },
    config: { duration: 200, easing: easings.easeOutCubic },
  })

  return (
    <div className="z-50 flex-col-reverse gap-5">
      {transitions((style, toast) => (
        <a.div style={{ ...style, position: 'relative' }}>
          <Toast {...toast} />
        </a.div>
      ))}
    </div>
  )
}
