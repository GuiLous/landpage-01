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
    <div className="z-20 flex items-center justify-center gap-3">
      <button
        className={twMerge(
          'h-10 w-10 cursor-pointer rounded-full bg-blue-500 flex items-center justify-center',
          'disabled:bg-gray-700',
          'active:bg-blue-300',
          'hover:cursor-pointer hover:bg-blue-300'
        )}
        disabled={slideIndex === 0}
        onClick={onLeftClick}
        aria-label="previous"
      >
        <div>
          <ChevronLeft className="text-white" />
        </div>
      </button>

      <button
        className={twMerge(
          'h-10 w-10 cursor-pointer rounded-full bg-blue-500 flex items-center justify-center',
          'disabled:bg-gray-700',
          'active:bg-blue-300',
          'hover:cursor-pointer hover:bg-blue-300'
        )}
        onClick={onRightClick}
        disabled={slideIndex === maxSlides}
        aria-label="next"
      >
        <div>
          <ChevronRight className="text-white" />
        </div>
      </button>
    </div>
  )
}
