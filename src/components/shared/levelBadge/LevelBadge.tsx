import Image from 'next/image'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const badge = tv({
  slots: {
    container: 'relative items-center justify-center',
    levelText: 'relative -ml-0.5 -mt-[15px] text-xl font-bold text-white',
  },
  variants: {
    variant: {
      xs: {
        container: 'min-w-[25px] max-w-[25px]',
        levelText: '-mt-[5px] text-[7px]',
      },

      sm: {
        container: 'min-w-[41px] max-w-[41px]',
        levelText: '-ml-px -mt-2 text-[11px]',
      },

      smd: {
        container: 'min-w-[55px] max-w-[55px]',
        levelText: '-mt-2 ml-0 text-[15px]',
      },

      md: {
        container:
          'min-w-[75px] max-w-[75px] 3xl:min-w-[55px] 3xl:max-w-[55px]',
        levelText:
          '-ml-0.5 -mt-[15px] text-xl 3xl:-mt-2 3xl:ml-0 3xl:text-[15px]',
      },

      lg: {
        container: 'min-w-[90px] max-w-[90px]',
        levelText: '-ml-0.5 -mt-[18px] text-2xl',
      },

      xl: {
        container: 'min-w-[120px] max-w-[120px]',
        levelText: '-ml-0.5 -mt-[22px] text-[32px]',
      },
    },
  },
  defaultVariants: {
    variant: 'md',
  },
})

type LevelBadgeProps = VariantProps<typeof badge> & {
  fitParent?: boolean
  level: number
  className?: string
}

const BADGE_SIZES = {
  xs: 25,
  sm: 41,
  smd: 55,
  md: 75,
  lg: 90,
  xl: 120,
}

export function LevelBadge({
  fitParent = false,
  level,
  variant,
  className,
}: LevelBadgeProps) {
  const { container, levelText } = badge({ variant })

  const calcLvlRange = useCallback(() => {
    let range = '0-9'
    if (level >= 10) range = '10-19'
    if (level >= 20) range = '20-29'
    if (level >= 30) range = '30-39'
    if (level >= 40) range = '40-49'
    if (level >= 50) range = '50'

    return range
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
      <div className="absolute h-full w-full items-center justify-center">
        <span className={levelText({ variant })}>{level}</span>
      </div>

      <Image
        src={`/assets/images/level_badges/badge_${calcLvlRange()}.png`}
        alt={`Level ${level}`}
        width={BADGE_SIZES[getVariant()]}
        height={BADGE_SIZES[getVariant()]}
      />
    </div>
  )
}
