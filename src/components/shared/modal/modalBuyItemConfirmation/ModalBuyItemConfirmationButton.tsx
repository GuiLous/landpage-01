import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import { revalidatePath } from '@/utils'

import { ItemType } from '@/functions'

import { Button, Link } from '@/components/shared'

interface ModalBuyItemConfirmationButtonProps {
  isCardOrProfile: boolean
  itemId: number
  itemType: ItemType
  isBoxOrCollection: boolean
}

export function ModalBuyItemConfirmationButton({
  isCardOrProfile,
  itemId,
  itemType,
  isBoxOrCollection,
}: ModalBuyItemConfirmationButtonProps) {
  const inventoryPath = '/inventario'
  const accountPath = '/conta'

  if (!isCardOrProfile && !isBoxOrCollection) {
    Cookies.set('purchasedItemId', String(itemId))
    Cookies.set('purchasedItemType', itemType)

    revalidatePath({ path: inventoryPath })
  }

  return (
    <div className={twMerge('items-center justify-center gap-4', '3xl:gap-3')}>
      <Button.Root
        asChild
        className={twMerge(
          'min-h-[38px] max-h-[38px] w-[184px]',
          '3xl:min-h-[34px] 3xl:max-h-[34px]'
        )}
      >
        <Link href={isCardOrProfile ? accountPath : inventoryPath}>
          <Button.Content className="text-sm font-semibold">
            {isCardOrProfile && 'Ver na conta'}
            {!isCardOrProfile && 'Ir para o inventário'}
          </Button.Content>
        </Link>
      </Button.Root>
    </div>
  )
}
