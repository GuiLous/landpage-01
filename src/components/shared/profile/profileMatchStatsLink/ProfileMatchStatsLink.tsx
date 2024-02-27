'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { MatchProfileType } from '@/functions'

import { Link } from '@/components/shared'

import { ProfileMatchStatsLinkBorder } from './ProfileMatchStatsLinkBorder'
import { ProfileMatchStatsLinkMapInfo } from './ProfileMatchStatsLinkMapInfo'
import { ProfileMatchStatsLinkStats } from './ProfileMatchStatsLinkStats'
import { ProfileMatchStatsLinkStatus } from './ProfileMatchStatsLinkStatus'

interface ProfileMatchStatsLinkProps {
  isLink?: boolean
  userId: number
  match: MatchProfileType
}

export function ProfileMatchStatsLink({
  isLink = true,
  userId,
  match,
}: ProfileMatchStatsLinkProps) {
  const [linkWidth, setLinkWidth] = useState(0)

  const linkRef = useRef<HTMLAnchorElement>(null)

  const showGameStatus =
    match?.status !== 'running' && match?.status !== 'warmup'

  const handleResize = () => {
    if (linkRef.current) {
      setLinkWidth(linkRef.current.offsetWidth)
    }
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Link
      className={twMerge(
        'items-center cursor-pointer rounded flex flex-1 p-3.5 pl-0 w-full bg-gradient_match_link_base',
        'group',
        showGameStatus &&
          match.won &&
          'bg-gradient_match_link_won hover:bg-gradient_match_link_won_hover',
        showGameStatus &&
          !match.won &&
          'bg-gradient_match_link_defeated hover:bg-gradient_match_link_defeated_hover',
        !isLink && 'cursor-default hover:bg-inherit'
      )}
      href={isLink ? `/perfil/${userId}/partidas/${match?.id}` : ''}
      asChild={!isLink}
      forwardRef={linkRef}
      disableSound={!isLink}
    >
      <div>
        <ProfileMatchStatsLinkBorder
          showGameStatus={showGameStatus}
          won={match.won}
        />

        <ProfileMatchStatsLinkMapInfo isLink={isLink} {...match} />

        <ProfileMatchStatsLinkStatus
          isLink={isLink}
          linkWidth={linkWidth}
          showGameStatus={showGameStatus}
          {...match}
        />

        <ProfileMatchStatsLinkStats
          isLink={isLink}
          showGameStatus={showGameStatus}
          {...match}
        />
      </div>
    </Link>
  )
}
