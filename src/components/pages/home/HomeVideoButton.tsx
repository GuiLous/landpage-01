'use client'

import { useState } from 'react'
import { PiPlayFill } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

import { Button, VideoPlayer } from '@/components/shared'

export function HomeVideoButton() {
  const [showVideo, setShowVideo] = useState(false)

  const closeVideo = () => {
    setShowVideo(false)
  }

  return (
    <>
      <Button.Root
        ghost
        className={twMerge(
          'min-h-[48px] w-full max-w-full gap-2 border-purple-400',
          'hover:bg-purple-300'
        )}
        onClick={() => setShowVideo(true)}
      >
        <Button.Icon icon={PiPlayFill} className="text-lg" />
        <Button.Content className="text-sm">
          Assistir <strong className="font-bold">Intro</strong>
        </Button.Content>
      </Button.Root>

      {showVideo && (
        <VideoPlayer
          videoSrc="https://www.youtube.com/embed/KxVZGpkAx3s?si=piMw7SmaLogj09wC"
          onClose={closeVideo}
          title="ReloadClub Intro"
        />
      )}
    </>
  )
}
