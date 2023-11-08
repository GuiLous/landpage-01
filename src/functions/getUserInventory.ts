import { getAuthServer } from '@/utils'

import { storeApi } from '@/modelsApi'

export interface StoreItem {
  id: number
  name: string
  item_type: string
  subtype?: string
  handle: string
  price: string
  release_date: string
  description: string
  discount: number
  background_image: string
  foreground_image: string
  box: any
  box_draw_chance: any
  collection: any
  featured: boolean
  in_use: boolean
  can_use: boolean
}

export interface Inventory {
  id: string
  user_id: number
  items: StoreItem[]
  boxes: StoreItem[]
}

export async function getUserInventory(): Promise<Inventory> {
  const auth = getAuthServer()

  const response = await storeApi.listInventory(auth.token, {
    next: { revalidate: 300, tags: ['inventory'] },
  })

  return response
}
