'use client'

import { useEffect, useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import { useAppSelector } from '@/store'

import { Tooltip } from '@/components/shared'

export function ConnectIp() {
  const { match } = useAppSelector((state) => state.match)

  const [copied, setCopied] = useState(false)
  const [copiedTime, setCopiedTime] = useState(0)

  const handleClipboard = () => {
    navigator.clipboard.writeText(`connect ${match?.server_ip}`)
    setCopied(!!match?.server_ip)
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
    <div className="justify-end">
      <div
        className={twMerge(
          'items-center gap-8 border border-purple-400 rounded-lg cursor-pointer mt-6 max-w-fit py-3 px-4 relative',
          '3xl:gap-7 3xl:mt-5 3xl:py-2.5 3xl:px-3.5'
        )}
        onClick={handleClipboard}
      >
        <span
          className={twMerge(
            'text-white',
            '3xl:text-sm',
            copied && ' text-purple-400'
          )}
        >
          {' '}
          IP: {match && match.server_ip}
        </span>

        <Tooltip content="Copiado!" open={copied}>
          <div className="">
            <AiOutlinePaperClip
              className={twMerge('text-white', copied && 'text-purple-400')}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
