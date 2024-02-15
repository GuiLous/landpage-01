'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const badge = tv({
  slots: {
    container: 'relative items-center justify-center',
    levelText: 'relative -mt-1.5 text-lg font-semibold text-white opacity-65',
  },
  variants: {
    variant: {
      xs: {
        container: 'min-w-[25px] max-w-[25px]',
        levelText: '-mt-0.5 text-[7px]',
      },

      sm: {
        container: 'min-w-[41px] max-w-[41px]',
        levelText: '-mt-px text-[11px]',
      },

      smd: {
        container: 'min-w-[52px] max-w-[52px]',
        levelText: '-mt-1 text-xs',
      },

      md: {
        container:
          'min-w-[75px] max-w-[75px] 3xl:min-w-[55px] 3xl:max-w-[55px]',
        levelText: '-mt-1 text-lg 3xl:-mt-1 3xl:text-sm',
      },

      lg: {
        container: 'min-w-[90px] max-w-[90px]',
        levelText: '-mt-2 text-2xl',
      },

      xl: {
        container: 'min-w-[120px] max-w-[120px]',
        levelText: '-mt-3.5 text-[32px]',
      },
    },
  },
  defaultVariants: {
    variant: 'md',
  },
})

const BADGE_SIZES = {
  xs: 25,
  sm: 41,
  smd: 55,
  md: 75,
  lg: 90,
  xl: 120,
}

type LevelBadgeProps = VariantProps<typeof badge> & {
  fitParent?: boolean
  level: number
  className?: string
  hideLevel?: boolean
}

export function LevelBadge({
  fitParent = false,
  level,
  variant,
  hideLevel = false,
  className,
}: LevelBadgeProps) {
  const { container, levelText } = badge({ variant })

  const calcLvlRange = useCallback(() => {
    if (level <= 5) return '0-5'
    if (level <= 10) return '6-10'
    if (level <= 15) return '11-15'
    if (level <= 20) return '16-20'
    if (level <= 25) return '21-25'
    if (level <= 29) return '26-29'

    return '30'
  }, [level])

  const getVariant = useCallback(() => {
    switch (variant) {
      case 'xs':
        return 'xs'
      case 'sm':
        return 'sm'
      case 'smd':
        return 'smd'
      case 'md':
        return 'md'
      case 'lg':
        return 'lg'
      case 'xl':
        return 'xl'
      default:
        return 'md'
    }
  }, [variant])

  return (
    <div
      className={container({
        variant,
        className: twMerge(className, fitParent && 'max-w-full min-w-full'),
      })}
    >
      <Image
        src={`/level_badges/badge_${calcLvlRange()}.webp`}
        alt={`Level ${level}`}
        width={BADGE_SIZES[getVariant()]}
        height={BADGE_SIZES[getVariant()]}
        sizes="100vw"
      />

      {!hideLevel && (
        <div className="absolute z-10 h-full w-full items-center justify-center">
          <span
            className={levelText({ variant })}
            style={{ textShadow: '0px 2px 3px rgba(0, 0, 0, 0.40)' }}
          >
            {level}
          </span>
        </div>
      )}
    </div>
  )
}
