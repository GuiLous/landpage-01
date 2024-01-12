'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { ModalReloadCoinConfirmation } from '@/components/shared'

export function RenderModalReloadCoinsConfirmation() {
  const [openModal, setOpenModal] = useState(false)

  const showCheckoutSuccess = Cookies.get('show_checkout_success')

  useEffect(() => {
    if (showCheckoutSuccess) {
      Cookies.remove('show_checkout_success')
      setOpenModal(true)
    }
  }, [showCheckoutSuccess])

  return <ModalReloadCoinConfirmation open={openModal} setOpen={setOpenModal} />
}
