'use client'

import { useCallback, useEffect, useState } from 'react'

import { TABS_NO_SWITCH } from '@/constants'

import { revalidate } from '@/utils'

import { Inventory, StoreItem } from '@/functions'

import { storeApi } from '@/modelsApi'

import {
  CustomScrollBar,
  ImagePreview,
  ItemsSelectList,
} from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import { InventoryItemDescription } from './InventoryItemDescription'
import { InventoryItemsTabBar } from './InventoryItemsTabBar/InventoryItemsTabBar'
import { InventorySubItemTab } from './InventorySubItemTab'

export type TabTypes = 'personagem' | 'sprays'
export type SubTabTypes = 'avatar' | 'roupas' | 'sprays'

const tabs = {
  personagem: {
    tabs: ['persona', 'wear'],
    subTabs: ['avatar', 'roupas'],
  },
  sprays: {
    tabs: ['spray'],
    subTabs: [],
  },
}

const sub_tabs = {
  avatar: 'persona',
  roupas: 'wear',
  sprays: 'spray',
}

interface InventoryWrapperContentProps {
  inventory: Inventory
}

export function InventoryWrapperContent({
  inventory,
}: InventoryWrapperContentProps) {
  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const [activeTab, setActiveTab] = useState<TabTypes>('personagem')
  const [activeSubTab, setActiveSubTab] = useState<SubTabTypes>('avatar')
  const [itemsByType, setItemsByType] = useState<StoreItem[]>([])
  const [itemSelected, setItemSelected] = useState<StoreItem | null>(null)
  const [newItemSelected, setNewItemSelected] = useState<StoreItem | null>(null)
  const [activeItemType, setActiveItemType] = useState<SubTabTypes>('avatar')
  const [isChecked, setIsChecked] = useState(false)

  const disableSwitch = TABS_NO_SWITCH.includes(activeItemType)

  const itemInUse = itemsByType.find((item) => item.in_use)
  const hasItemInUse = !!itemInUse

  const filterItemsByType = useCallback(() => {
    if (activeTab === 'sprays') {
      const itemsFiltered = inventory.items.filter(
        (item) => item.item_type === sub_tabs[activeTab]
      )

      setItemsByType(itemsFiltered)
      return
    }

    let itemsFiltered = inventory.items.filter(
      (item) => item.item_type === sub_tabs[activeSubTab]
    )

    if (!disableSwitch) {
      if (isChecked) {
        itemsFiltered = itemsFiltered.filter((item) => item.subtype === 'def')
      } else {
        itemsFiltered = itemsFiltered.filter((item) => item.subtype !== 'def')
      }
    }

    setItemsByType(itemsFiltered)
  }, [activeTab, activeSubTab, inventory, disableSwitch, isChecked])

  const handleUpdateItemInUse = useCallback(
    async (item_id: number) => {
      if (!auth?.token) return

      const itemById = itemsByType.find((item) => item.id === item_id)

      if (itemById) {
        const payload = { in_use: !itemById.in_use }

        const response = await storeApi.updateInUse(
          auth.token,
          item_id,
          payload
        )

        if (response.errorMsg) {
          showErrorToast(response.errorMsg)
          return
        }

        const newItemSelected = response.items.find(
          (item: StoreItem) => item.id === item_id
        )

        revalidate('inventory')
        setNewItemSelected(newItemSelected)
      }
    },
    [auth, itemsByType, showErrorToast]
  )

  useEffect(() => {
    if (inventory?.items.length > 0) {
      filterItemsByType()
    }
  }, [inventory, activeTab, activeSubTab, filterItemsByType])

  useEffect(() => {
    if (itemsByType.length > 0) {
      setItemSelected(itemsByType[0])
    } else {
      setItemSelected(null)
    }
  }, [itemsByType])

  useEffect(() => {
    if (newItemSelected) {
      setItemSelected(newItemSelected)
    }
  }, [newItemSelected, itemSelected])

  useEffect(() => {
    setNewItemSelected(null)
  }, [activeTab, activeSubTab])

  return (
    <>
      <InventoryItemsTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        disableSideSelect={disableSwitch}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        setActiveItemType={setActiveItemType}
        setActiveSubTab={setActiveSubTab}
      />

      <div className="gap-20">
        <aside className="max-w-[364px] flex-col justify-between">
          <div className="flex-initial flex-col gap-4">
            <InventorySubItemTab
              activeSubTab={activeSubTab}
              setActiveItemType={setActiveItemType}
              setActiveSubTab={setActiveSubTab}
              subTabs={tabs[activeTab].subTabs}
            />

            <CustomScrollBar height={312}>
              <ItemsSelectList
                handleUpdateItemInUse={handleUpdateItemInUse}
                hasItemInUse={hasItemInUse}
                itemSelectedId={itemSelected?.id}
                items={itemsByType}
                setItemSelected={setItemSelected}
                setNewItemSelected={setNewItemSelected}
              />
            </CustomScrollBar>
          </div>

          {itemSelected && (
            <InventoryItemDescription
              handleUpdateItemInUse={handleUpdateItemInUse}
              item={itemSelected}
              itemType={activeItemType}
            />
          )}
        </aside>

        <ImagePreview itemSelected={itemSelected} />
      </div>
    </>
  )
}
