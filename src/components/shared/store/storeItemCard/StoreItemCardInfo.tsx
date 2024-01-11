import { StoreItem } from '@/functions'

import { StoreItemCardInfoName } from './StoreItemCardInfoName'
import { StoreItemCardInfoPrice } from './StoreItemCardInfoPrice'

interface StoreItemCardInfoProps {
  item: StoreItem
}

export function StoreItemCardInfo({ item }: StoreItemCardInfoProps) {
  return (
    <main className="flex-initial flex-col gap-8">
      <StoreItemCardInfoName item={item} />

      <StoreItemCardInfoPrice item={item} />
    </main>
  )
}
