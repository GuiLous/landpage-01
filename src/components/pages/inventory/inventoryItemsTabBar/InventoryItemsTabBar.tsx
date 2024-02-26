import { SubTabTypes, TabTypes } from '../InventoryWrapperContent'
import { InventoryItemsTabBarTabs } from './InventoryItemsTabBarTabs'

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
    </div>
  )
}
