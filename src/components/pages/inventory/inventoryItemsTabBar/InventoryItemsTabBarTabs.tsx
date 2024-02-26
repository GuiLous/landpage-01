import { twMerge } from 'tailwind-merge'

import { TABS } from '@/constants'

import { useAudio } from '@/hooks'

import { SubTabTypes, TabTypes } from '../InventoryWrapperContent'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

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
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const handleChangeTab = (tab: TabTypes) => {
    playSoundClick()

    setActiveTab(tab)

    if (tab === 'personagem') {
      setActiveItemType('roupas')
      setActiveSubTab('roupas')
      return
    }

    if (tab === 'arsenal') {
      setActiveItemType('pistolas')
      setActiveSubTab('pistolas')
      return
    }

    setActiveItemType(tab)
  }

  return (
    <div className={twMerge('max-w-fit gap-6', '3xl:gap-5')}>
      {TABS.map((tab) => (
        <button
          key={tab}
          className={twMerge(
            'max-w-fit cursor-pointer flex-col gap-1',
            '3xl:gap-0.5'
          )}
          onClick={() => handleChangeTab(tab as TabTypes)}
          onMouseEnter={activeTab !== tab ? playSoundHover : undefined}
        >
          <span
            className={twMerge(
              'font-medium transition-colors uppercase text-gray-300',
              'hover:text-white',
              '3xl:text-sm',
              activeTab === tab && 'text-white'
            )}
          >
            {tab}
          </span>

          {activeTab === tab && <div className="min-h-[3px] bg-purple-400" />}
        </button>
      ))}
    </div>
  )
}
