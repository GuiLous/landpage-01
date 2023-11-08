import { StoreItem } from '@/functions'

import { ItemsSelectListCard } from './ItemsSelectListCard'

interface ItemsSelectListProps {
  items: StoreItem[]
  itemSelectedId?: number
  setItemSelected: (state: StoreItem) => void
  setNewItemSelected: (state: StoreItem | null) => void
  handleUpdateItemInUse: (itemId: number) => void
  hasItemInUse: boolean
}

export function ItemsSelectList({
  handleUpdateItemInUse,
  hasItemInUse,
  itemSelectedId,
  items = [],
  setItemSelected,
  setNewItemSelected,
}: ItemsSelectListProps) {
  const handleChangeItemSelected = (item: StoreItem) => {
    setNewItemSelected(null)
    setItemSelected(item)
  }

  const handleRemoveItem = () => {
    const itemInUse = items.find((item) => item.in_use)

    if (itemInUse) {
      handleUpdateItemInUse(itemInUse.id)
    }
  }

  return (
    <div className="grid grid-cols-[repeat(4,_80px)] content-baseline gap-2">
      <ItemsSelectListCard
        index={0}
        isEmpty
        onClick={handleRemoveItem}
        hasItemInUse={hasItemInUse}
      />

      {items.map((item, index) => (
        <ItemsSelectListCard
          key={item.id}
          index={index + 1}
          item={item}
          itemSelectedId={itemSelectedId}
          onClick={() => handleChangeItemSelected(item)}
        />
      ))}
    </div>
  )
}
