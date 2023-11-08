import { twMerge } from 'tailwind-merge'

import { SubTabTypes } from './InventoryWrapperContent'

interface InventorySubItemTabProps {
  activeSubTab: string
  setActiveSubTab: (state: SubTabTypes) => void
  subTabs: string[]
  setActiveItemType: (state: SubTabTypes) => void
}

export function InventorySubItemTab({
  activeSubTab,
  setActiveItemType,
  setActiveSubTab,
  subTabs,
}: InventorySubItemTabProps) {
  const handleSubItemTabChange = (tab: SubTabTypes) => {
    setActiveItemType(tab)
    setActiveSubTab(tab)
  }

  return (
    <div className="flex-initial items-center gap-2">
      {subTabs.map((tab) => (
        <div
          key={tab}
          className={twMerge(
            'max-w-fit flex-initial bg-gray-1100 rounded cursor-pointer py-3.5 px-2.5'
          )}
          style={{
            background:
              activeSubTab === tab
                ? 'linear-gradient(0deg,rgba(104, 71, 255, 0.3) 0%,rgba(104, 71, 255, 0.3) 100%),#1b1b1b'
                : '',
          }}
          onClick={() => handleSubItemTabChange(tab as SubTabTypes)}
        >
          <span
            className={twMerge(
              'text-sm capitalize transition-colors leading-none text-gray-300',
              'hover:text-white',
              activeSubTab === tab && 'text-white'
            )}
          >
            {tab}
          </span>
        </div>
      ))}
    </div>
  )
}
