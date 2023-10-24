'use client'

import Cookies from 'js-cookie'
import { useCallback } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

import { Link } from '@/components/shared'

export function LayoutHeader() {
  const handleCancel = useCallback(() => {
    Cookies.remove('token')
  }, [])

  return (
    <header className="absolute left-8 top-8 max-w-fit flex-initial">
      <Link
        href="/"
        className="flex items-center gap-2.5"
        onClick={handleCancel}
      >
        <IoIosArrowRoundBack size={31} />
        <span className="font-medium">Cancelar e sair</span>
      </Link>
    </header>
  )
}
