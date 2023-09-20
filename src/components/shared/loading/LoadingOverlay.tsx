import { ReactNode } from 'react'

interface LoadingOverlayProps {
  children?: ReactNode
}

export function LoadingOverlay({ children }: LoadingOverlayProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 h-screen w-full flex-col items-center justify-center gap-3 bg-black/90">
      {children}
    </div>
  )
}
