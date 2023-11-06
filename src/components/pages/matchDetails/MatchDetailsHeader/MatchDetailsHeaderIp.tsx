'use client'

import { useEffect, useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import { MatchStatus } from '@/store/slices/matchSlice'

import { CustomIcon, Tooltip } from '@/components/shared'

interface MatchDetailsHeaderIpProps {
  status: MatchStatus
  server_ip: string
}

export function MatchDetailsHeaderIp({
  status,
  server_ip,
}: MatchDetailsHeaderIpProps) {
  const [copied, setCopied] = useState(false)
  const [copiedTime, setCopiedTime] = useState(0)

  const handleClipboard = () => {
    navigator.clipboard.writeText(`connect ${server_ip}`)
    setCopied(!!server_ip)
  }

  useEffect(() => {
    if (copied) {
      const maxCopiedTime = 3
      const interval = setInterval(() => {
        setCopiedTime(copiedTime + 1)
        if (copiedTime >= maxCopiedTime) {
          clearInterval(interval)
          setCopied(false)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  })

  return (
    status === 'running' && (
      <div className="items-center gap-4">
        <span>-</span>

        <div
          onClick={handleClipboard}
          className="max-w-fit flex-initial cursor-pointer items-center gap-3.5"
        >
          <CustomIcon
            icon={AiOutlinePaperClip}
            color={copied ? 'purple.400' : 'white'}
          />

          <Tooltip content="Copiado!" open={copied} side="bottom">
            <span
              className={twMerge(
                'text-white text-lg',
                copied && 'text-purple-400'
              )}
            >
              IP: {server_ip}
            </span>
          </Tooltip>
        </div>
      </div>
    )
  )
}
