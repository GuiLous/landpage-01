'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'

export default function CheckoutError() {
  const router = useRouter()

  Cookies.remove('checkout_initiated')

  const itemObject = Cookies.get('itemObject')
  const itemId = Cookies.get('itemId')

  useEffect(() => {
    useAppStore.getState().addToast({
      content: 'Não foi possível processar sua compra.',
      variant: 'warning',
    })

    revalidatePath({ path: '/' })

    if (!itemObject || !itemId) return router.push('/jogar')

    router.push(`/loja`)
  }, [itemId, itemObject, router])

  return null
}
