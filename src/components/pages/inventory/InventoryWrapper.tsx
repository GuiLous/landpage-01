import { twMerge } from 'tailwind-merge'

import { getUserInventory } from '@/functions'

import { InventoryWrapperContent } from './InventoryWrapperContent'

export async function InventoryWrapper() {
  const inventory = await getUserInventory()

  return (
    <section className={twMerge('flex-col gap-10 px-[3.750rem]', '3xl:px-7')}>
      <InventoryWrapperContent inventory={inventory} />
    </section>
  )
}
