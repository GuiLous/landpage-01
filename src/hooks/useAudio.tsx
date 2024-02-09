'use client'

import { useCallback, useRef } from 'react'

export const useAudio = (audioUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(audioUrl) : undefined
  )

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }, [])

  return playSound
}
