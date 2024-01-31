import { twMerge } from 'tailwind-merge'

import { dynamicBlurDataUrl } from '@/utils'

import { getUserInventory } from '@/functions'

import { InventoryWrapperContent } from './InventoryWrapperContent'

export async function InventoryWrapper() {
  const inventory = await getUserInventory()

  const placeholders = await Promise.all(
    inventory.items.map((item) => dynamicBlurDataUrl(item.foreground_image))
  )

  return (
    <section
      className={twMerge('flex-col gap-10 px-[3.750rem]', '3xl:px-7 3xl:gap-8')}
    >
      <InventoryWrapperContent
        inventory={inventory}
        placeholders={placeholders}
      />
    </section>
  )
}
