import { WeaponNameType, getAuthServer } from '@/utils'

import { storeApi } from '@/modelsApi'

export type ItemType =
  | 'wear'
  | 'spray'
  | 'persona'
  | 'consumable'
  | 'weapon'
  | 'decorative'

export type ItemSubType = 'ata' | 'def' | 'card' | 'profile'

export type Media = {
  id: number
  file: string
  media_type: string
}

export interface StoreItem {
  id: number
  name: string
  item_type: ItemType
  subtype?: ItemSubType
  handle: string
  price: number
  release_date: string
  description: string
  discount: number
  background_image?: string
  decorative_image?: string
  foreground_image: string
  box: any
  box_draw_chance: any
  collection: any
  featured: boolean
  in_use: boolean
  can_use: boolean
  featured_image: string
  object: 'box' | 'collection' | 'item'
  items?: StoreItem[]
  is_purchased?: boolean
  item_id: number
  media: Media[]
  is_starter: boolean
  weapon?: WeaponNameType
}

export interface Store {
  next_rotation: string
  featured: StoreItem[]
  products: StoreItem[]
}

export async function getStore(): Promise<Store> {
  const auth = getAuthServer()

  const response = await storeApi.listStore(auth.token, {
    next: { revalidate: 300, tags: ['store'] },
  })

  return response
}
