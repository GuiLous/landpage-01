'use client'

import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function DeletePurchasedItemsFromCookies() {
  const pathname = usePathname()

  const purchasedItemId = Cookies.get('purchasedItemId')
  const purchasedItemType = Cookies.get('purchasedItemType')

  useEffect(() => {
    if (
      pathname !== '/inventario' &&
      pathname !== '/loja' &&
      !!purchasedItemId &&
      !!purchasedItemType
    ) {
      Cookies.remove('purchasedItemId')
      Cookies.remove('purchasedItemType')
    }
  }, [pathname, purchasedItemId, purchasedItemType])
  return null
}
