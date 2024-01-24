'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import {
  CustomScrollBar,
  ItemsSelectList,
  ProfileCard,
} from '@/components/shared'

import { AccountPlayerDecorationButtons } from './AccountPlayerDecorationButtons'
import { AccountPlayerDecorationPreview } from './AccountPlayerDecorationPreview'

interface AccountPlayerDecorationProps {
  title: string
  isProfileCover?: boolean
  items: StoreItem[]
}

export function AccountPlayerDecoration({
  title,
  isProfileCover = false,
  items = [],
}: AccountPlayerDecorationProps) {
  const [itemSelected, setItemSelected] = useState<StoreItem | null>(null)
  const [newItemSelected, setNewItemSelected] = useState<StoreItem | null>(null)
  const itemInUse = items.find((item) => item.in_use)

  const hasItemInUse = !!itemInUse

  useEffect(() => {
    if (items.length > 0 && hasItemInUse) {
      setItemSelected(itemInUse)
    } else {
      setItemSelected(null)
    }
  }, [items, itemInUse, hasItemInUse])

  useEffect(() => {
    if (newItemSelected) {
      setItemSelected(newItemSelected)
    }
  }, [newItemSelected, itemSelected])

  return (
    <ProfileCard
      variant="account"
      title={title}
      maxWidth={!isProfileCover ? '47%' : '100%'}
    >
      <div className={twMerge('flex-col gap-8 h-full', '3xl:gap-7')}>
        <div
          className={twMerge(
            'gap-6 h-full',
            isProfileCover && 'flex-col',
            '3xl:gap-5'
          )}
        >
          <AccountPlayerDecorationPreview
            isProfileCover={isProfileCover}
            foreground_image={itemSelected?.foreground_image}
          />

          <div
            className={twMerge(
              'flex-col bg-gray-700/40 rounded-lg h-full max-h-[345px] min-h-[345px] py-2.5 pr-1 pl-2.5',
              '3xl:max-h-[300px] 3xl:min-h-[300px]',
              isProfileCover &&
                'max-h-[204px] min-h-[204px] 3xl:max-h-[184px] 3xl:min-h-[184px]'
            )}
          >
            {isProfileCover ? (
              <CustomScrollBar
                dark
                wrapperClassName={twMerge(
                  'max-h-[204px] min-h-full',
                  '3xl:max-h-[184px]'
                )}
              >
                <ItemsSelectList
                  items={items}
                  itemSelectedId={itemSelected?.id}
                  setItemSelected={setItemSelected}
                  setNewItemSelected={setNewItemSelected}
                  hasItemInUse={hasItemInUse}
                  isAccountPage
                />
              </CustomScrollBar>
            ) : (
              <CustomScrollBar
                dark
                wrapperClassName={twMerge(
                  'max-h-[345px] min-h-full',
                  '3xl:max-h-[300px]'
                )}
              >
                <ItemsSelectList
                  items={items}
                  itemSelectedId={itemSelected?.id}
                  setItemSelected={setItemSelected}
                  setNewItemSelected={setNewItemSelected}
                  hasItemInUse={hasItemInUse}
                  isAccountPage
                />
              </CustomScrollBar>
            )}
          </div>
        </div>

        <AccountPlayerDecorationButtons
          isProfileCover={isProfileCover}
          itemSelected={itemSelected}
          setNewItemSelected={setNewItemSelected}
        />
      </div>
    </ProfileCard>
  )
}
