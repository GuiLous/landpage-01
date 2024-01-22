import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { ItemsSelectListCard } from './ItemsSelectListCard'

interface ItemsSelectListProps {
  items: StoreItem[]
  itemSelectedId?: number
  setItemSelected: (state: StoreItem) => void
  setNewItemSelected: (state: StoreItem | null) => void
  hasItemInUse: boolean
}

export function ItemsSelectList({
  items = [],
  itemSelectedId,
  setItemSelected,
  setNewItemSelected,
  hasItemInUse,
}: ItemsSelectListProps) {
  const handleChangeItemSelected = (item: StoreItem) => {
    setNewItemSelected(null)
    setItemSelected(item)
  }

  return (
    <div
      className={twMerge(
        'grid grid-cols-[repeat(4,_80px)] content-baseline gap-2',
        '3xl:grid-cols-[repeat(4,_64px)]'
      )}
    >
      {items.map((item, index) => (
        <ItemsSelectListCard
          key={item.id}
          index={index}
          item={item}
          itemSelectedId={itemSelectedId}
          hasItemInUse={hasItemInUse}
          onClick={() => handleChangeItemSelected(item)}
        />
      ))}
    </div>
  )
}
