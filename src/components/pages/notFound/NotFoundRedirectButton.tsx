'use client'

import Cookies from 'js-cookie'
import { useCallback } from 'react'

import { Button, Link } from '@/components/shared'

export function NotFoundRedirectButton() {
  const handleRemoveCookies = useCallback(() => {
    Cookies.remove('tried_login')
  }, [])

  return (
    <Button.Root asChild onClick={handleRemoveCookies}>
      <Link href="/">
        <Button.Content className="w-60 text-center text-sm font-bold">
          Voltar para o início
        </Button.Content>
      </Link>
    </Button.Root>
  )
}
