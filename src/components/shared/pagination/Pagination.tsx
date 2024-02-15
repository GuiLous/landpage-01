'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { SIBLINGS_COUNT } from '@/constants'

import { generatePagesArray } from '@/utils'

import { Button } from '@/components/shared'

interface PaginationProps {
  totalPages: number
  currentPage?: number
}

export function Pagination({ totalPages, currentPage = 1 }: PaginationProps) {
  const pathname = usePathname()
  const lastPage = totalPages

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : []

  return (
    <div
      className={twMerge('items-center justify-center gap-3', ' 3xl:gap-2.5')}
    >
      {currentPage > 1 && (
        <Button.Root pagination asChild>
          <Link
            href={{
              pathname,
              query: { page: String(currentPage - 1) },
            }}
          >
            <Button.Icon pagination icon={RiArrowLeftSLine} size={28} />
          </Link>
        </Button.Root>
      )}

      {currentPage > 1 + SIBLINGS_COUNT && (
        <>
          <Button.Root pagination asChild>
            <Link
              href={{
                pathname,
                query: { page: '1' },
              }}
            >
              <Button.Content className="mt-px leading-none" pagination>
                1
              </Button.Content>
            </Link>
          </Button.Root>

          {currentPage > 2 + SIBLINGS_COUNT && (
            <Button.Root
              pagination
              className="cursor-default hover:bg-transparent active:bg-transparent"
              disableClickSound
              disableHoverSound
            >
              <Button.Content className="ml-px text-lg leading-none tracking-[2px] text-gray-300">
                ...
              </Button.Content>
            </Button.Root>
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => {
          return (
            <Button.Root key={page} pagination asChild>
              <Link
                href={{
                  pathname,
                  query: { page: String(page) },
                }}
              >
                <Button.Content className="mt-px leading-none" pagination>
                  {String(page)}
                </Button.Content>
              </Link>
            </Button.Root>
          )
        })}

      <Button.Root disabled pagination>
        <Button.Content className="mt-px text-base font-semibold leading-none">
          {String(currentPage)}
        </Button.Content>
      </Button.Root>

      {nextPages.length > 0 &&
        nextPages.map((page) => {
          return (
            <Button.Root key={page} pagination asChild>
              <Link
                href={{
                  pathname,
                  query: { page: String(page) },
                }}
              >
                <Button.Content className="mt-px leading-none" pagination>
                  {String(page)}
                </Button.Content>
              </Link>
            </Button.Root>
          )
        })}

      {currentPage + SIBLINGS_COUNT < lastPage && (
        <>
          {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
            <Button.Root
              pagination
              className="cursor-default hover:bg-transparent active:bg-transparent"
              disableClickSound
              disableHoverSound
            >
              <Button.Content className="ml-px text-lg leading-none tracking-[2px] text-gray-300">
                ...
              </Button.Content>
            </Button.Root>
          )}

          <Button.Root asChild pagination>
            <Link
              href={{
                pathname,
                query: { page: String(lastPage) },
              }}
            >
              <Button.Content className="mt-px leading-none" pagination>
                {String(lastPage)}
              </Button.Content>
            </Link>
          </Button.Root>
        </>
      )}

      {currentPage < lastPage && (
        <Button.Root asChild pagination>
          <Link
            href={{
              pathname,
              query: { page: String(currentPage + 1) },
            }}
          >
            <Button.Icon pagination icon={RiArrowRightSLine} size={28} />
          </Link>
        </Button.Root>
      )}
    </div>
  )
}
