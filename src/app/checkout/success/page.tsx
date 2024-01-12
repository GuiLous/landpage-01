'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { revalidatePath } from '@/utils'

export default function CheckoutSuccess() {
  const router = useRouter()

  const itemObject = Cookies.get('itemObject')
  const itemId = Cookies.get('itemId')

  Cookies.remove('checkout_initiated')
  Cookies.set('show_checkout_success', 'true')

  useEffect(() => {
    if (!itemObject || !itemId) return router.push('/jogar')

    revalidatePath({ path: '/loja' })

    router.push(`/loja`)
  }, [itemId, itemObject, router])

  return null
}
