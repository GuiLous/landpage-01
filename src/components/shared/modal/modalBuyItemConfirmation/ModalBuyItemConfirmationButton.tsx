import { twMerge } from 'tailwind-merge'

import { Button, Link } from '@/components/shared'

export function ModalBuyItemConfirmationButton() {
  return (
    <div className={twMerge('items-center justify-center gap-4', '3xl:gap-3')}>
      <Button.Root
        asChild
        className={twMerge(
          'min-h-[38px] max-h-[38px] w-[184px]',
          '3xl:min-h-[34px] 3xl:max-h-[34px]'
        )}
      >
        <Link href="/inventario">
          <Button.Content className="text-sm font-semibold">
            Ir para o inventário
          </Button.Content>
        </Link>
      </Button.Root>
    </div>
  )
}
