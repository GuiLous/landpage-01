'use client'

import { Pointer } from 'lucide-react'
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
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <p
          className={twMerge(
            'text-center text-xl font-semibold',
            'lg:text-2xl'
          )}
        >
          Clique aqui e descubra o que terá no E-BOOK
        </p>

        <Pointer className="animate-bounce_hand text-yellow-300" size={50} />
      </div>

      <div
        className={twMerge(
          'relative flex flex-1 items-center justify-center border-4 border-white',
          'lg:w-1/3'
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
    </div>
  )
}
