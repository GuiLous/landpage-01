'use client'

import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { TABS_NO_SWITCH } from '@/constants'

import { WeaponNameType, WeaponType, revalidate } from '@/utils'

import { Inventory, ItemType, StoreItem } from '@/functions'

import { storeApi } from '@/modelsApi'

import {
  CenteredCarouselWrapper,
  CustomScrollBar,
  ImagePreview,
  ItemsPreview,
  ItemsSelectList,
  WeaponsSelectList,
} from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import { InventoryActiveWeaponButton } from './InventoryActiveWeaponButton'
import { InventoryItemDescription } from './InventoryItemDescription'
import { InventoryItemsTabBar } from './InventoryItemsTabBar/InventoryItemsTabBar'
import { InventorySubItemTab } from './InventorySubItemTab'

const notSelected = '/assets/images/not_selected.png'

export type TabTypes = 'personagem' | 'sprays' | 'arsenal'
export type SubTabTypes =
  | 'roupas'
  | 'sprays'
  | 'pistolas'
  | 'submetralhadoras'
  | 'escopetas'
  | 'metralhadoras'
  | 'fuzis'

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
    tabs: ['wear'],
    subTabs: ['roupas'],
  },
  sprays: {
    tabs: ['spray'],
    subTabs: [],
  },
}

const sub_tabs = {
  roupas: 'wear',
  sprays: 'spray',
  pistolas: 'pistols',
  submetralhadoras: 'smgs',
  escopetas: 'shotguns',
  metralhadoras: 'machineguns',
  fuzis: 'rifles',
}

const tabs_search = {
  weapon: 'arsenal',
  persona: 'personagem',
  spray: 'sprays',
  wear: 'personagem',
  consumable: '',
  decorative: '',
}

const sub_tabs_search = {
  pistols: 'pistolas',
  smgs: 'submetralhadoras',
  shotguns: 'escopetas',
  machineguns: 'metralhadoras',
  rifles: 'rifles',
  roupas: 'wear',
  sprays: '',
  ata: '',
  def: '',
  card: '',
  profile: '',
}

const nullObject = {
  id: 0,
  foreground_image: notSelected,
  in_use: false,
}

interface InventoryWrapperContentProps {
  inventory: Inventory
  placeholders: string[]
}

export function InventoryWrapperContent({
  inventory,
  placeholders,
}: InventoryWrapperContentProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const searchItemId = Cookies.get('purchasedItemId')
  const searchItemType = Cookies.get('purchasedItemType') as
    | ItemType
    | undefined

  const searchItemObject = (!!searchItemId &&
    inventory.items.find((item) => item.item_id === Number(searchItemId))) as
    | StoreItem
    | undefined

  const [activeTab, setActiveTab] = useState<TabTypes>(
    searchItemType ? (tabs_search[searchItemType] as TabTypes) : 'arsenal'
  )

  const [activeSubTab, setActiveSubTab] = useState<SubTabTypes>(
    searchItemObject?.subtype
      ? (sub_tabs_search[searchItemObject.subtype] as SubTabTypes)
      : 'pistolas'
  )

  const [itemsByType, setItemsByType] = useState<Partial<Item[]>>([])
  const [itemSelected, setItemSelected] = useState<StoreItem | null>(
    searchItemObject || null
  )
  const [newItemSelected, setNewItemSelected] = useState<StoreItem | null>(null)
  const [activeItemType, setActiveItemType] = useState<SubTabTypes>('pistolas')
  const [isChecked, setIsChecked] = useState(false)
  const [weaponSelected, setWeaponSelected] = useState<WeaponNameType>(
    searchItemObject?.weapon ? searchItemObject.weapon : 'Pistola'
  )
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [itemInUseIndex, setItemInUseIndex] = useState(0)

  const disableSwitch = TABS_NO_SWITCH.includes(activeItemType)
  const itemInUse = itemsByType.find((item) => item?.in_use)
  const hasItemInUse = !!itemInUse
  const hasSearchFilters = !!searchItemId && !!searchItemType

  const itemSelectedIndex = itemsByType.findIndex(
    (item) => item?.item_id === itemSelected?.item_id
  )

  const isNullWeapon = itemsByType[activeItemIndex]?.id === 0
  const isArsenal = activeTab === 'arsenal'

  const filterItemsByType = useCallback(() => {
    if (activeTab === 'sprays') {
      const itemsFiltered = inventory.items.filter(
        (item) => item.item_type === sub_tabs[activeTab]
      )

      setItemsByType([nullObject, ...itemsFiltered])
      return
    }

    if (isArsenal) {
      const itemsFilteredByType = inventory.items.filter(
        (item) => item.item_type === 'weapon'
      )

      const itemsFilteredByWeapon = itemsFilteredByType.filter(
        (item) => item.subtype === sub_tabs[activeSubTab]
      )

      const itemsFilteredByWeaponName = itemsFilteredByWeapon.filter(
        (item) => item.weapon === weaponSelected
      )

      setItemsByType([nullObject, ...itemsFilteredByWeaponName])

      if (hasSearchFilters) {
        const weaponIndex = itemsFilteredByWeaponName.findIndex(
          (item) => item?.item_id === Number(searchItemId)
        )

        if (weaponIndex !== -1) setActiveItemIndex(weaponIndex + 1)
      }
      return
    }

    const itemsFiltered = inventory.items.filter(
      (item) => item.item_type === sub_tabs[activeSubTab]
    )

    setItemsByType([nullObject, ...itemsFiltered])
  }, [
    activeTab,
    isArsenal,
    inventory.items,
    hasSearchFilters,
    activeSubTab,
    weaponSelected,
    searchItemId,
  ])

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
    if (hasSearchFilters) {
      if (searchItemType === 'persona' || searchItemType === 'wear') {
        if (searchItemType === 'wear') {
          setActiveSubTab('roupas')
        }
      }
    }
  }, [hasSearchFilters, searchItemType])

  useEffect(() => {
    filterItemsByType()
  }, [inventory, activeTab, activeSubTab, filterItemsByType, weaponSelected])

  useEffect(() => {
    if (hasSearchFilters) return

    if (itemsByType.length > 0) {
      if (hasItemInUse) {
        setItemSelected(itemInUse as StoreItem)
        return
      }

      setItemSelected(itemsByType[0] as StoreItem)
      return
    }

    setItemSelected(null)
  }, [
    itemsByType,
    hasItemInUse,
    itemInUse,
    searchItemId,
    searchItemType,
    hasSearchFilters,
  ])

  useEffect(() => {
    if (hasSearchFilters) return

    if (newItemSelected) {
      setItemSelected(newItemSelected)
    }
  }, [
    newItemSelected,
    itemSelected,
    searchItemId,
    searchItemType,
    hasSearchFilters,
  ])

  useEffect(() => {
    if (hasSearchFilters) {
      if (activeTab === 'arsenal') {
        if (
          searchItemObject?.weapon &&
          weaponSelected !== searchItemObject.weapon
        ) {
          Cookies.remove('purchasedItemId')
          Cookies.remove('purchasedItemType')

          return
        }

        if (
          searchItemObject?.subtype &&
          activeSubTab !==
            (sub_tabs_search[searchItemObject.subtype] as SubTabTypes)
        ) {
          Cookies.remove('purchasedItemId')
          Cookies.remove('purchasedItemType')
        }
      }

      if (activeTab !== tabs_search[searchItemType]) {
        Cookies.remove('purchasedItemId')
        Cookies.remove('purchasedItemType')
      }
    }

    setNewItemSelected(null)
  }, [
    activeTab,
    activeSubTab,
    weaponSelected,
    activeItemIndex,
    searchItemId,
    searchItemType,
    hasSearchFilters,
    inventory.items,
    searchItemObject?.weapon,
    searchItemObject?.subtype,
  ])

  useEffect(() => {
    if (isArsenal) {
      setItemSelected(itemsByType[activeItemIndex] as StoreItem)
    }
  }, [
    activeItemIndex,
    itemsByType,
    isArsenal,
    searchItemId,
    searchItemType,
    hasSearchFilters,
  ])

  useEffect(() => {
    if (hasSearchFilters) return

    if (hasItemInUse) {
      const itemIndex = itemsByType.findIndex((item) => item?.in_use)
      setItemInUseIndex(itemIndex)
    }
  }, [
    hasItemInUse,
    itemsByType,
    activeSubTab,
    activeTab,
    weaponSelected,
    searchItemId,
    searchItemType,
    hasSearchFilters,
  ])

  useEffect(() => {
    if (hasSearchFilters) return

    if (isArsenal) {
      setActiveItemIndex(0)
    }
  }, [
    activeTab,
    activeSubTab,
    weaponSelected,
    isArsenal,
    searchItemId,
    searchItemType,
    hasSearchFilters,
  ])

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

      <div className={twMerge('gap-20', '3xl:gap-16')}>
        <aside
          className={twMerge(
            'max-w-[364px] flex-col justify-between',
            '3xl:max-w-[355px]'
          )}
        >
          <div className="flex-initial flex-col gap-4">
            {tabs[activeTab].subTabs.length > 0 && (
              <InventorySubItemTab
                activeSubTab={activeSubTab}
                setActiveItemType={setActiveItemType}
                setActiveSubTab={setActiveSubTab}
                subTabs={tabs[activeTab].subTabs as SubTabTypes[]}
                setWeaponSelected={setWeaponSelected}
              />
            )}

            {isArsenal && (
              <CustomScrollBar
                className={twMerge(
                  'max-h-[375px] max-w-fit',
                  '3xl:max-h-[255px]'
                )}
              >
                <WeaponsSelectList
                  weaponSelected={weaponSelected}
                  setWeaponSelected={setWeaponSelected}
                  activeSubTab={activeSubTab as WeaponType}
                />
              </CustomScrollBar>
            )}

            {!isArsenal && (
              <CustomScrollBar className="max-h-[312px] max-w-fit">
                <ItemsSelectList
                  hasItemInUse={hasItemInUse}
                  itemSelectedId={itemSelected?.id}
                  items={itemsByType as StoreItem[]}
                  setItemSelected={setItemSelected}
                  setNewItemSelected={setNewItemSelected}
                />
              </CustomScrollBar>
            )}
          </div>

          {itemSelected && (
            <InventoryItemDescription
              handleUpdateItemInUse={handleUpdateItemInUse}
              item={itemSelected}
              itemType={activeItemType}
              itemInUse={itemInUse as StoreItem}
              isArsenal={isArsenal}
            />
          )}
        </aside>

        <aside className={twMerge('flex-col gap-10', '3xl:gap-8')}>
          <ImagePreview
            itemSelected={itemSelected}
            isArsenal={isArsenal}
            hasSkins={itemsByType.length > 0}
            placeholders={placeholders}
            itemSelectedIndex={itemSelectedIndex}
          />

          {isArsenal && itemSelected && (
            <section
              className={twMerge('flex-initial flex-col gap-7', '3xl:gap-6')}
            >
              {((isNullWeapon && hasItemInUse) || !isNullWeapon) && (
                <div className="min-h-[44px] items-center justify-between">
                  <ItemsPreview
                    imagesPreview={itemsByType[activeItemIndex]?.media}
                  />

                  <InventoryActiveWeaponButton
                    handleUpdateItemInUse={handleUpdateItemInUse}
                    weapon_id={itemsByType[activeItemIndex]?.id}
                    in_use={itemsByType[activeItemIndex]?.in_use}
                    hasItemInUse={hasItemInUse}
                    itemInUse={itemInUse as StoreItem}
                  />
                </div>
              )}

              <CenteredCarouselWrapper
                data={itemsByType as StoreItem[]}
                setActiveItemIndex={setActiveItemIndex}
                hasItemInUse={hasItemInUse}
                itemInUseIndex={itemInUseIndex}
                isInventory
                hasSearchFilters={hasSearchFilters}
                activeItemIndex={activeItemIndex}
              />
            </section>
          )}
        </aside>
      </div>
    </>
  )
}
