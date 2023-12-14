// import { twMerge } from 'tailwind-merge'

// import { Switch } from '@/components/shared'

import { SubTabTypes, TabTypes } from '../InventoryWrapperContent'
// import { InventoryItemsTabBarCt } from './InventoryItemsTabBarCt'
import { InventoryItemsTabBarTabs } from './InventoryItemsTabBarTabs'
// import { InventoryItemsTabBarTr } from './InventoryItemsTabBarTr'

interface InventoryItemsTabBarProps {
  activeTab: string
  setActiveTab: (tab: TabTypes) => void
  disableSideSelect: boolean
  isChecked: boolean
  setIsChecked: (state: boolean) => void
  setActiveItemType: (state: SubTabTypes) => void
  setActiveSubTab: (tab: SubTabTypes) => void
}

export function InventoryItemsTabBar({
  activeTab,
  setActiveItemType,
  setActiveSubTab,
  setActiveTab,
}: InventoryItemsTabBarProps) {
  return (
    <div className="flex-initial items-center justify-between">
      <InventoryItemsTabBarTabs
        activeTab={activeTab}
        setActiveItemType={setActiveItemType}
        setActiveSubTab={setActiveSubTab}
        setActiveTab={setActiveTab}
      />

      {/* <div
        className={twMerge(
          'max-w-fit flex-initial items-center gap-2.5',
          disableSideSelect && 'opacity-30'
        )}
      >
        <InventoryItemsTabBarTr
          disableSideSelect={disableSideSelect}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />

        <Switch
          onCheckedChange={() => setIsChecked(!isChecked)}
          checked={disableSideSelect ? false : isChecked}
          disabled={disableSideSelect}
        >
          <Switch.Thumb />
        </Switch>

        <InventoryItemsTabBarCt
          disableSideSelect={disableSideSelect}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      </div> */}
    </div>
  )
}
