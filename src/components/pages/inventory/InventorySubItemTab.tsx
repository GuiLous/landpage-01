import { createRef, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { capitalizeFirstLetter } from '@/utils'

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
  const [selectedTabsRef, setSelectedTabsRef] = useState<any>([])

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleSubItemTabChange = (tab: SubTabTypes) => {
    setActiveItemType(tab)
    setActiveSubTab(tab)

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

        const gapToShowAllTabs = 60

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
        'min-h-[42px] w-full max-w-[364px] flex-initial items-center gap-2 overflow-x-hidden',
        '3xl:min-h-[38px] 3xl:max-w-[355px] 3xl:gap-1.5'
      )}
      ref={wrapperRef}
    >
      {subTabs.map((tab, index) => (
        <div
          key={tab}
          className={twMerge(
            'max-w-fit flex-initial bg-gray-700/30 rounded cursor-pointer py-3.5 px-2.5',
            '3xl:py-3'
          )}
          style={{
            background:
              activeSubTab === tab
                ? 'linear-gradient(0deg,rgba(104, 71, 255, 0.3) 0%,rgba(104, 71, 255, 0.3) 100%),#1b1b1b'
                : '',
          }}
          onClick={() => handleSubItemTabChange(tab as SubTabTypes)}
          ref={(el) => (selectedTabsRef[index] = el)}
        >
          <span
            className={twMerge(
              'text-sm transition-colors text-gray-300',
              'leading-none',
              'hover:text-white',
              activeSubTab === tab && 'text-white'
            )}
          >
            {capitalizeFirstLetter(tab)}
          </span>
        </div>
      ))}
    </div>
  )
}
