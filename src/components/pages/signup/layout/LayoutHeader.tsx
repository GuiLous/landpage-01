'use client'

import Cookies from 'js-cookie'
import { useCallback } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

import { GoBackLink } from '@/components/shared'

export function LayoutHeader() {
  const handleCancel = useCallback(() => {
    Cookies.remove('token')
  }, [])

  return (
    <GoBackLink.Root onClick={handleCancel} href="/" prefetch={false}>
      <GoBackLink.Icon icon={IoIosArrowRoundBack} size={31} />
      <GoBackLink.Content>Cancelar e sair</GoBackLink.Content>
    </GoBackLink.Root>
  )
}
