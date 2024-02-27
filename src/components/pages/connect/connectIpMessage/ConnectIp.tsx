'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiOutlineClipboardDocument } from 'react-icons/hi2'
import { SiFivem } from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import { useMatchStore } from '@/store/matchStore'

import { Button, Tooltip } from '@/components/shared'

export function ConnectIp() {
  const { match } = useMatchStore()

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
    <div
      className={twMerge(
        'mt-5 max-w-[480px] flex-initial items-center justify-end gap-4',
        '3xl:max-w-[400px]',
        'ultrawide:max-w-[660px]'
      )}
    >
      <div
        className={twMerge(
          'items-center justify-between max-w-[228px] gap-2 px-4 border border-purple-400 rounded cursor-pointer py-3.5 min-h-12 relative',
          '3xl:max-w-[200px] 3xl:py-3',
          'ultrawide:max-w-[328px] ultrawide:min-h-16'
        )}
        onClick={handleClipboard}
      >
        <span className={twMerge('text-white text-sm', 'ultrawide:text-xl')}>
          {' '}
          IP: {match && match.server_ip}
        </span>

        <Tooltip content="Copiado!" open={copied}>
          <div className="max-w-fit flex-initial">
            <HiOutlineClipboardDocument
              className={twMerge(
                'text-white text-xl',
                copied && 'text-purple-400',
                'ultrawide:text-3xl'
              )}
            />
          </div>
        </Tooltip>
      </div>

      <Button.Root
        asChild
        className={twMerge(
          'w-full max-w-[228px] py-3.5',
          '3xl:max-w-[200px] 3xl:py-3',
          'ultrawide:min-h-16 ultrawide:max-h-16 ultrawide:max-w-[328px]'
        )}
        type="submit"
      >
        <Link href={`fivem://connect/${match?.server_ip}`} target="_blank">
          <Button.Icon
            icon={SiFivem}
            className={twMerge('text-white text-xl', 'ultrawide:text-3xl')}
          />

          <Button.Content
            className={twMerge('text-sm font-normal', 'ultrawide:text-xl')}
          >
            Conectar
            <span className="ml-1 font-bold">FiveM</span>
          </Button.Content>
        </Link>
      </Button.Root>
    </div>
  )
}
