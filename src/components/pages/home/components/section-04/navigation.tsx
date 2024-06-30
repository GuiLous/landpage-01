import { Button } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface NavigationProps {
  slideIndex: number
  maxSlides: number
  onLeftClick: () => void
  onRightClick: () => void
}

export function Navigation({
  onLeftClick,
  onRightClick,
  slideIndex,
  maxSlides,
}: NavigationProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        className={twMerge(
          'h-10 w-10 cursor-pointer rounded-full',
          'disabled:bg-gray-700'
        )}
        disabled={slideIndex === 0}
        onClick={onLeftClick}
      >
        <div>
          <ChevronLeft className="text-white" />
        </div>
      </Button>

      <Button
        className={twMerge(
          'h-10 w-10 cursor-pointer rounded-full',
          'disabled:bg-gray-700'
        )}
        onClick={onRightClick}
        disabled={slideIndex === maxSlides}
      >
        <div>
          <ChevronRight className="text-white" />
        </div>
      </Button>
    </div>
  )
}
