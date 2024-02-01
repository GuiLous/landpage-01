import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { InventoryActiveWeaponButton } from '@/components/pages/inventory/InventoryActiveWeaponButton'
import { nullObject } from '@/components/pages/inventory/InventoryWrapperContent'

import { CenteredCarouselWrapper, ItemsPreview } from '@/components/shared'

import { SkeletonImagePreview } from './SkeletonImagePreview'
import { SkeletonInventoryItemsTabBar } from './SkeletonInventoryItemsTabBar'
import { SkeletonInventorySubItemTab } from './SkeletonInventorySubItemTab'
import { SkeletonWeaponSelectList } from './SkeletonWeaponSelectList'

export function SkeletonInventory() {
  return (
    <section
      className={twMerge('flex-col gap-10 px-[3.750rem]', '3xl:px-7 3xl:gap-8')}
    >
      <SkeletonInventoryItemsTabBar />

      <div className={twMerge('gap-20', '3xl:gap-16')}>
        <aside
          className={twMerge(
            'max-w-[364px] flex-col justify-between',
            '3xl:max-w-[355px]'
          )}
        >
          <div className="flex-initial flex-col gap-4">
            <SkeletonInventorySubItemTab />

            <SkeletonWeaponSelectList />
          </div>
        </aside>

        <aside className={twMerge('flex-col gap-10', '3xl:gap-8')}>
          <SkeletonImagePreview />

          <section
            className={twMerge('flex-initial flex-col gap-7', '3xl:gap-6')}
          >
            <div className="min-h-[44px] items-center justify-between">
              <ItemsPreview imagesPreview={[]} />

              <InventoryActiveWeaponButton />
            </div>

            <CenteredCarouselWrapper
              data={[nullObject] as StoreItem[]}
              isInventory
            />
          </section>
        </aside>
      </div>
    </section>
  )
}
