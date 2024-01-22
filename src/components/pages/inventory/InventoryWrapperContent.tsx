'use client'

import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { TABS_NO_SWITCH } from '@/constants'

import { WeaponNameType, WeaponType, revalidate } from '@/utils'

import { Inventory, StoreItem } from '@/functions'

import { storeApi } from '@/modelsApi'

import {
  CenteredCarouselWrapper,
  CustomScrollBar,
  ImagePreview,
  ItemsSelectList,
  WeaponVideoPreview,
  WeaponsSelectList,
} from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import notSelected from '@/assets/images/not_selected.png'

import { InventoryActiveWeaponButton } from './InventoryActiveWeaponButton'
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
  pistolas: 'pistols',
  submetralhadoras: 'smgs',
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

const nullObject = {
  id: 0,
  foreground_image: notSelected.src,
  in_use: false,
}

export function InventoryWrapperContent({
  inventory,
}: InventoryWrapperContentProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [activeTab, setActiveTab] = useState<TabTypes>('arsenal')
  const [activeSubTab, setActiveSubTab] = useState<SubTabTypes>('pistolas')
  const [itemsByType, setItemsByType] = useState<Partial<Item[]>>([])
  const [itemSelected, setItemSelected] = useState<StoreItem | null>(null)
  const [newItemSelected, setNewItemSelected] = useState<StoreItem | null>(null)
  const [activeItemType, setActiveItemType] = useState<SubTabTypes>('pistolas')
  const [isChecked, setIsChecked] = useState(false)
  const [weaponSelected, setWeaponSelected] =
    useState<WeaponNameType>('Pistola')
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [itemInUseIndex, setItemInUseIndex] = useState(0)

  const disableSwitch = TABS_NO_SWITCH.includes(activeItemType)
  const itemInUse = itemsByType.find((item) => item?.in_use)
  const hasItemInUse = !!itemInUse

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

    if (activeTab === 'perfil') {
      const itemsFiltered = inventory.items.filter(
        (item) => item.subtype === sub_tabs[activeSubTab]
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
      return
    }

    const itemsFiltered = inventory.items.filter(
      (item) => item.item_type === sub_tabs[activeSubTab]
    )

    setItemsByType([nullObject, ...itemsFiltered])
  }, [activeTab, activeSubTab, inventory, weaponSelected, isArsenal])

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
    filterItemsByType()
  }, [inventory, activeTab, activeSubTab, filterItemsByType, weaponSelected])

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
  }, [activeTab, activeSubTab, weaponSelected, activeItemIndex])

  useEffect(() => {
    if (isArsenal) {
      setItemSelected(itemsByType[activeItemIndex] as StoreItem)
    }
  }, [activeItemIndex, itemsByType, weaponSelected, isArsenal])

  useEffect(() => {
    if (hasItemInUse) {
      const itemIndex = itemsByType.findIndex((item) => item?.in_use)
      setItemInUseIndex(itemIndex)
    }
  }, [hasItemInUse, itemsByType, activeSubTab, activeTab, weaponSelected])

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
          />

          {isArsenal && itemSelected && (
            <section
              className={twMerge('flex-initial flex-col gap-7', '3xl:gap-6')}
            >
              {((isNullWeapon && hasItemInUse) || !isNullWeapon) && (
                <div className="min-h-[44px] items-center justify-between">
                  <WeaponVideoPreview
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
              />
            </section>
          )}
        </aside>
      </div>
    </>
  )
}
