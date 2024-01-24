import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { ItemsSelectListCard } from './ItemsSelectListCard'

interface ItemsSelectListProps {
  items: StoreItem[]
  itemSelectedId?: number
  setItemSelected: (state: StoreItem) => void
  setNewItemSelected: (state: StoreItem | null) => void
  hasItemInUse: boolean
  isAccountPage?: boolean
}

export function ItemsSelectList({
  items = [],
  itemSelectedId,
  setItemSelected,
  setNewItemSelected,
  hasItemInUse,
  isAccountPage = false,
}: ItemsSelectListProps) {
  const handleChangeItemSelected = (item: StoreItem) => {
    setNewItemSelected(null)
    setItemSelected(item)
  }

  return (
    <div
      className={twMerge(
        'grid grid-cols-[repeat(4,_80px)] content-baseline gap-2',
        '3xl:grid-cols-[repeat(4,_64px)]',
        isAccountPage && 'grid-cols-[repeat(auto-fill,_56px)] h-fit'
      )}
    >
      {items.map((item, index) => (
        <ItemsSelectListCard
          key={item.id}
          index={index}
          item={item}
          itemSelectedId={itemSelectedId}
          hasItemInUse={hasItemInUse}
          isAccountPage={isAccountPage}
          onClick={() => handleChangeItemSelected(item)}
        />
      ))}
    </div>
  )
}
