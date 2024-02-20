'use client'

import { Friend } from '@/store/friendStore'

import { useAudio } from '@/hooks'

import { LineupCustomSeat } from './LineupCustomSeat'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface LineupCustomRenderSeatsProps {
  players?: Friend[]
}

export function LineupCustomRenderSeats({
  players = [],
}: LineupCustomRenderSeatsProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  return (
    players.length < 5 &&
    Array.from(Array(5 - players.length)).map((_, index) => (
      <LineupCustomSeat
        key={index}
        playSoundClick={playSoundClick}
        playSoundHover={playSoundHover}
      />
    ))
  )
}
