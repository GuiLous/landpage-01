'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { revalidatePath } from '@/utils'

import { storageService } from '@/services'

export default function CheckoutError() {
  const router = useRouter()

  Cookies.remove('checkout_initiated')

  useEffect(() => {
    storageService.set('checkout_cancelled', true)

    const itemObject = storageService.get('itemObject')
    const itemId = storageService.get('itemId')

    revalidatePath({ path: '/' })

    if (!itemObject || !itemId) return router.push('/jogar')

    router.push(`/loja`)
  }, [router])

  return null
}
