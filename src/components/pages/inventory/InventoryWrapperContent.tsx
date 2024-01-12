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

import notSelected from '@/assets/images/not_selected.png'

import { InventoryItemDescription } from './InventoryItemDescription'
import { InventoryItemsTabBar } from './InventoryItemsTabBar/InventoryItemsTabBar'
import { InventorySubItemTab } from './InventorySubItemTab'

export type TabTypes = 'personagem' | 'sprays' | 'arsenal' | 'caixas' | 'perfil'
export type SubTabTypes =
  | 'avatar'
  | 'roupas'
  | 'sprays'
  | 'pistolas'
  | 'submetralhadoras'
  | 'escopetas'
  | 'metralhadoras'
  | 'fuzis'
  | 'caixas'
  | 'capas de perfil'
  | 'cards de jogador'
  | 'perfil'

type Item = Partial<StoreItem>

const tabs = {
  arsenal: {
    tabs: ['pistol', 'submachineguns', 'shotguns', 'machineguns', 'rifles'],
    subTabs: [
      'pistolas',
      'submetralhadoras',
      'escopetas',
      'metralhadoras',
      'fuzis',
    ],
  },
  personagem: {
    tabs: ['persona', 'wear', 'poses'],
    subTabs: ['avatar', 'roupas', 'poses'],
  },
  sprays: {
    tabs: ['spray'],
    subTabs: [],
  },
  caixas: {
    tabs: ['boxes'],
    subTabs: [],
  },
  perfil: {
    tabs: ['profile', 'card'],
    subTabs: ['capas de perfil', 'cards de jogador'],
  },
}

const sub_tabs = {
  avatar: 'persona',
  roupas: 'wear',
  sprays: 'spray',
  pistolas: 'pistol',
  submetralhadoras: 'submachineguns',
  escopetas: 'shotguns',
  metralhadoras: 'machineguns',
  fuzis: 'rifles',
  caixas: 'boxes',
  'capas de perfil': 'profile',
  'cards de jogador': 'card',
  perfil: 'profile',
}

interface InventoryWrapperContentProps {
  inventory: Inventory
}

export function InventoryWrapperContent({
  inventory,
}: InventoryWrapperContentProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [activeTab, setActiveTab] = useState<TabTypes>('arsenal')
  const [activeSubTab, setActiveSubTab] = useState<SubTabTypes>('pistolas')
  const [itemsByType, setItemsByType] = useState<Partial<Item[]>>([
    {
      id: 0,
      foreground_image: notSelected.src,
      in_use: false,
    },
  ])
  const [itemSelected, setItemSelected] = useState<StoreItem | null>(null)
  const [newItemSelected, setNewItemSelected] = useState<StoreItem | null>(null)
  const [activeItemType, setActiveItemType] = useState<SubTabTypes>('avatar')
  const [isChecked, setIsChecked] = useState(false)

  const disableSwitch = TABS_NO_SWITCH.includes(activeItemType)

  const itemInUse = itemsByType.find((item) => item?.in_use)
  const hasItemInUse = !!itemInUse

  const filterItemsByType = useCallback(() => {
    if (activeTab === 'sprays') {
      const itemsFiltered = inventory.items.filter(
        (item) => item.item_type === sub_tabs[activeTab]
      )

      setItemsByType((prevState) => [{ ...prevState[0] }, ...itemsFiltered])
      return
    }

    if (activeTab === 'perfil') {
      const itemsFiltered = inventory.items.filter(
        (item) => item.subtype === sub_tabs[activeSubTab]
      )

      setItemsByType((prevState) => [{ ...prevState[0] }, ...itemsFiltered])
      return
    }

    const itemsFiltered = inventory.items.filter(
      (item) => item.item_type === sub_tabs[activeSubTab]
    )

    // if (!disableSwitch) {
    //   if (isChecked) {
    //     itemsFiltered = itemsFiltered.filter((item) => item.subtype === 'def')
    //   } else {
    //     itemsFiltered = itemsFiltered.filter((item) => item.subtype !== 'def')
    //   }
    // }

    setItemsByType((prevState) => [{ ...prevState[0] }, ...itemsFiltered])
  }, [activeTab, activeSubTab, inventory])

  const handleUpdateItemInUse = useCallback(
    async ({
      item_id,
      updateSelected = true,
    }: {
      item_id: number
      updateSelected?: boolean
    }) => {
      if (!auth?.token) return

      const itemById = itemsByType.find((item) => item?.id === item_id)

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

        if (updateSelected) {
          const newItemSelected = response.items.find(
            (item: StoreItem) => item.id === item_id
          )
          setNewItemSelected(newItemSelected)
        }

        revalidate('inventory')
      }
    },
    [auth?.token, itemsByType, showErrorToast]
  )

  useEffect(() => {
    if (inventory?.items.length > 0) {
      filterItemsByType()
    }
  }, [inventory, activeTab, activeSubTab, filterItemsByType])

  useEffect(() => {
    if (itemsByType.length > 0) {
      if (hasItemInUse) {
        setItemSelected(itemInUse as StoreItem)
        return
      }

      setItemSelected(itemsByType[0] as StoreItem)
      return
    }

    setItemSelected(null)
  }, [itemsByType, hasItemInUse, itemInUse])

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
                hasItemInUse={hasItemInUse}
                itemSelectedId={itemSelected?.id}
                items={itemsByType as StoreItem[]}
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
              itemInUse={itemInUse as StoreItem}
            />
          )}
        </aside>

        <ImagePreview itemSelected={itemSelected} />
      </div>
    </>
  )
}
