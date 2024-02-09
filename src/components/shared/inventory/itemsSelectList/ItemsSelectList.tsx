'use client'

import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { useAudio } from '@/hooks'

import { ItemsSelectListCard } from './ItemsSelectListCard'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

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
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const handleChangeItemSelected = (item: StoreItem) => {
    playSoundClick()
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
          onMouseEnter={
            item?.id !== itemSelectedId ? playSoundHover : undefined
          }
          onClick={() => handleChangeItemSelected(item)}
        />
      ))}
    </div>
  )
}
