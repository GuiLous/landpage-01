import { GiCrossedSwords } from 'react-icons/gi'
import { twMerge } from 'tailwind-merge'

import { CustomIcon } from '@/components/shared'

interface InventoryItemsTabBarTrProps {
  setIsChecked: (state: boolean) => void
  isChecked: boolean
  disableSideSelect: boolean
}

export function InventoryItemsTabBarTr({
  setIsChecked,
  isChecked,
  disableSideSelect,
}: InventoryItemsTabBarTrProps) {
  return (
    <div
      className="max-w-fit flex-initial items-center gap-1.5"
      onClick={() => setIsChecked(false)}
    >
      <span
        className={twMerge(
          'm-0 cursor-pointer text-red-500',
          (isChecked || disableSideSelect) && 'text-gray-300'
        )}
      >
        Ataque
      </span>

      <CustomIcon
        icon={GiCrossedSwords}
        className={twMerge(
          'transition-colors text-red-500',
          (isChecked || disableSideSelect) && 'text-gray-300'
        )}
        size={16}
      />
    </div>
  )
}
