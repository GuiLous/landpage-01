'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { revalidatePath } from '@/utils'

export default function CheckoutError() {
  const router = useRouter()

  Cookies.remove('checkout_initiated')
  Cookies.set('checkout_cancelled', 'true')

  const itemObject = Cookies.get('itemObject')
  const itemId = Cookies.get('itemId')

  useEffect(() => {
    if (!itemObject || !itemId) return router.push('/jogar')

    revalidatePath({ path: '/loja' })

    router.push(`/loja`)
  }, [router, itemObject, itemId])

  return null
}
