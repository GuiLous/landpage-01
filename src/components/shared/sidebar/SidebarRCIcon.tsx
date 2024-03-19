import { BiPlus } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/shared'

export function SidebarRCIcon() {
  return (
    <Button.Root
      asChild
      className={twMerge(
        'max-h-9 min-h-9 min-w-9 rounded-e-none',
        '3xl:max-h-8 3xl:min-h-8 3xl:min-w-8',
        'ultrawide:max-h-14 ultrawide:min-h-14 ultrawide:min-w-14'
      )}
    >
      <div className="max-w-fit flex-initial">
        <Button.Icon
          icon={BiPlus}
          className={twMerge('text-2xl', 'ultrawide:text-3xl')}
        />
      </div>
    </Button.Root>
  )
}
