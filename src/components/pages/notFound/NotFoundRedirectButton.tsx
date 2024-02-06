'use client'

import Cookies from 'js-cookie'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, Link } from '@/components/shared'

export function NotFoundRedirectButton() {
  const handleRemoveCookies = useCallback(() => {
    Cookies.remove('tried_login')
  }, [])

  return (
    <Button.Root asChild onClick={handleRemoveCookies}>
      <Link href="/">
        <Button.Content
          className={twMerge(
            'w-60 text-center text-sm font-bold',
            'ultrawide:w-96'
          )}
        >
          Voltar para o início
        </Button.Content>
      </Link>
    </Button.Root>
  )
}
