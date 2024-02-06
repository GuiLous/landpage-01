import { createRef, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { WeaponNameType, capitalizeFirstLetter } from '@/utils'

import { useAudio } from '@/hooks'

import { SubTabTypes } from './InventoryWrapperContent'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface InventorySubItemTabProps {
  activeSubTab: SubTabTypes
  subTabs: SubTabTypes[]
  setActiveSubTab: (state: SubTabTypes) => void
  setActiveItemType: (state: SubTabTypes) => void
  setWeaponSelected: (state: WeaponNameType) => void
}

export function InventorySubItemTab({
  activeSubTab,
  setActiveItemType,
  setActiveSubTab,
  subTabs,
  setWeaponSelected,
}: InventorySubItemTabProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const [selectedTabsRef, setSelectedTabsRef] = useState<any>([])

  const wrapperRef = useRef<HTMLDivElement>(null)

  const gapToShowAllTabs = 30

  const handleSubItemTabChange = (tab: SubTabTypes) => {
    playSoundClick()

    setActiveItemType(tab)
    setActiveSubTab(tab)

    if (tab === 'pistolas') setWeaponSelected('Pistola')
    if (tab === 'submetralhadoras') setWeaponSelected('Micro')
    if (tab === 'escopetas') setWeaponSelected('Doze')
    if (tab === 'metralhadoras') setWeaponSelected('Rambinho')
    if (tab === 'fuzis') setWeaponSelected('AK')

    if (wrapperRef.current && selectedTabsRef.length === 0) {
      return
    }
    const wrapper = wrapperRef.current

    const tabIndex = subTabs.indexOf(tab)

    const selectedTab = selectedTabsRef[tabIndex]

    if (selectedTab && wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect()
      const selectedTabRect = selectedTab.getBoundingClientRect()

      const isTabOutsideViewRight = selectedTabRect.right > wrapperRect.right
      const isTabOutsideViewLeft = selectedTabRect.left < wrapperRect.left

      if (isTabOutsideViewRight || isTabOutsideViewLeft) {
        const scrollAmount = isTabOutsideViewRight
          ? selectedTabRect.right - wrapperRect.right + wrapper.scrollLeft
          : selectedTabRect.left - wrapperRect.left

        wrapper.scrollTo({
          left: scrollAmount + gapToShowAllTabs,
          behavior: 'smooth',
        })
      }
    }
  }

  useEffect(() => {
    const refsArray = subTabs.map(() => createRef())
    setSelectedTabsRef(refsArray)
  }, [subTabs, activeSubTab])

  return (
    <div
      className={twMerge(
        'min-h-[38px] w-full max-w-[364px] flex-initial items-center gap-2 overflow-hidden',
        '3xl:max-w-[355px] 3xl:gap-1.5'
      )}
      ref={wrapperRef}
    >
      {subTabs.map((tab, index) => (
        <button
          key={tab}
          className={twMerge(
            'max-w-fit max-h-[38px] min-h-[38px] px-2.5 flex-initial bg-gray-700/30 rounded cursor-pointer items-center justify-center',
            'group'
          )}
          style={{
            background:
              activeSubTab === tab
                ? 'linear-gradient(0deg,rgba(104, 71, 255, 0.3) 0%,rgba(104, 71, 255, 0.3) 100%),#1b1b1b'
                : '',
          }}
          onClick={() => handleSubItemTabChange(tab as SubTabTypes)}
          onMouseEnter={activeSubTab !== tab ? playSoundHover : undefined}
          ref={(el) => (selectedTabsRef[index] = el)}
        >
          <span
            className={twMerge(
              'text-sm transition-colors text-gray-300',
              'leading-none',
              'group-hover:text-white',
              activeSubTab === tab && 'text-white'
            )}
          >
            {capitalizeFirstLetter(tab)}
          </span>
        </button>
      ))}
    </div>
  )
}
