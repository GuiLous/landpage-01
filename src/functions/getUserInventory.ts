import { getAuthServer } from '@/utils'

import { storeApi } from '@/modelsApi'

import { StoreItem } from './getStore'

export interface Inventory {
  id: string
  user_id: number
  items: StoreItem[]
  boxes: StoreItem[]
}

export async function getUserInventory(): Promise<Inventory> {
  const auth = await getAuthServer()

  const response = await storeApi.listInventory(auth.token, {
    next: { revalidate: 300, tags: ['inventory'] },
  })

  return response
}
