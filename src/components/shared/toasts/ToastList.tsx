'use client'

import { animated as a, easings, useTransition } from '@react-spring/web'

import { useAppStore } from '@/store/appStore'

import { Toast } from './Toast'

export function ToastList() {
  const { app } = useAppStore()
  const toasts = app.toasts

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
