import { twMerge } from 'tailwind-merge'

import { TABS } from '@/constants'

import { SubTabTypes, TabTypes } from '../InventoryWrapperContent'

interface InventoryItemsTabBarTabsProps {
  activeTab: string
  setActiveTab: (tab: TabTypes) => void
  setActiveItemType: (state: SubTabTypes) => void
  setActiveSubTab: (tab: SubTabTypes) => void
}

export function InventoryItemsTabBarTabs({
  setActiveItemType,
  setActiveSubTab,
  setActiveTab,
  activeTab,
}: InventoryItemsTabBarTabsProps) {
  const handleChangeTab = (tab: TabTypes) => {
    setActiveTab(tab)

    if (tab === 'personagem') {
      setActiveItemType('avatar')
      setActiveSubTab('avatar')
      return
    }

    if (tab === 'arsenal') {
      setActiveItemType('pistolas')
      setActiveSubTab('pistolas')
      return
    }

    if (tab === 'perfil') {
      setActiveItemType('capas de perfil')
      setActiveSubTab('capas de perfil')
      return
    }

    setActiveItemType(tab)
  }

  return (
    <div className="max-w-fit gap-6">
      {TABS.map((tab) => (
        <div
          key={tab}
          className="max-w-fit cursor-pointer flex-col gap-1"
          onClick={() => handleChangeTab(tab as TabTypes)}
        >
          <span
            className={twMerge(
              'font-medium transition-colors uppercase text-gray-300',
              'hover:text-white',
              activeTab === tab && 'text-white'
            )}
          >
            {tab}
          </span>

          {activeTab === tab && <div className="min-h-[3px] bg-purple-400" />}
        </div>
      ))}
    </div>
  )
}
