'use client'

import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { twMerge } from 'tailwind-merge'

import { PlayIcon } from '@/components/shared/video-player/play-icon'

const videoSrc = '/videos/video01.mp4'

export function VideoPlayer() {
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlayPause = () => {
    setPlaying((prev) => !prev)
  }

  return (
    <div
      className={twMerge(
        'relative flex flex-1 items-center justify-center',
        'lg:min-h-[670px]'
      )}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoSrc}
        controls={false}
        playing={playing}
        playIcon={<PlayIcon />}
        width="100%"
        height="100%"
        onClick={handlePlayPause}
        loop
      />
      <source src={videoSrc} type="video/mp4" />

      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handlePlayPause}
        >
          <PlayIcon />
        </div>
      )}
    </div>
  )
}
