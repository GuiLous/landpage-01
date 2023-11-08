import { GiWhiteTower } from 'react-icons/gi'
import { twMerge } from 'tailwind-merge'

import { CustomIcon } from '@/components/shared'

interface InventoryItemsTabBarCtProps {
  setIsChecked: (state: boolean) => void
  isChecked: boolean
  disableSideSelect: boolean
}

export function InventoryItemsTabBarCt({
  setIsChecked,
  isChecked,
  disableSideSelect,
}: InventoryItemsTabBarCtProps) {
  return (
    <div
      className="max-w-fit flex-initial items-center gap-1.5"
      onClick={() => setIsChecked(!disableSideSelect)}
    >
      <CustomIcon
        icon={GiWhiteTower}
        className={twMerge(
          'transition-colors text-gray-300',
          isChecked && !disableSideSelect && 'text-blue-500'
        )}
        size={16}
      />
      <span
        className={twMerge(
          'm-0 cursor-pointer text-gray-300',
          isChecked && !disableSideSelect && 'text-blue-500'
        )}
      >
        Defesa
      </span>
    </div>
  )
}
