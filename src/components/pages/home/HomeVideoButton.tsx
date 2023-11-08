import { PiPlayFill } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/shared'

export function HomeVideoButton() {
  return (
    <Button.Root
      ghost
      className={twMerge(
        'min-h-[48px] w-full max-w-full gap-2 border-purple-400',
        'hover:bg-purple-300'
      )}
      type="submit"
    >
      <Button.Icon icon={PiPlayFill} className="text-lg" />
      <Button.Content className="text-sm">
        Assistir <strong className="font-bold">Intro</strong>
      </Button.Content>
    </Button.Root>
  )
}
