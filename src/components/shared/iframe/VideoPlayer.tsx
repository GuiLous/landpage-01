'use client'

import { useRef } from 'react'

import { useOutsideClick } from '@/hooks'

interface VideoPlayerProps {
  videoSrc: string
  title: string
  onClose: () => void
}

export function VideoPlayer({ videoSrc, title, onClose }: VideoPlayerProps) {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useOutsideClick({
    ref: frameRef,
    handler: onClose,
  })

  return (
    <div className="fixed left-0 top-0 z-40 h-full w-full items-center justify-center bg-black/80">
      <div className="relative h-full w-full overflow-hidden pt-[56.25%]">
        <iframe
          ref={frameRef}
          src={videoSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute left-1/2 top-1/2 block h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2"
        ></iframe>
      </div>
    </div>
  )
}
