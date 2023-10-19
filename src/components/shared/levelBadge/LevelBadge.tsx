'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const badge = tv({
  base: 'relative items-center justify-center',
  variants: {
    xs: {
      true: 'min-w-[25px] max-w-[25px]',
    },
    sm: {
      true: 'min-w-[41px] max-w-[41px]',
    },
    smd: {
      true: 'min-w-[55px] max-w-[55px]',
    },
    md: {
      true: 'min-w-[75px] max-w-[75px] 3xl:min-w-[55px] 3xl:max-w-[55px]',
    },
    lg: {
      true: 'min-w-[90px] max-w-[90px]',
    },
    xl: {
      true: 'min-w-[120px] max-w-[120px]',
    },
  },
  defaultVariants: {
    xs: false,
    sm: false,
    smd: false,
    md: false,
    lg: false,
    xl: false,
  },
})

const levelText = tv({
  base: 'relative -ml-0.5 -mt-[15px] text-xl font-bold text-white',
  variants: {
    xs: {
      true: '-mt-[5px] text-[7px]',
    },
    sm: {
      true: '-ml-px -mt-2 text-[11px]',
    },
    smd: {
      true: '-mt-2 ml-0 text-[15px]',
    },
    md: {
      true: '-ml-0.5 -mt-[15px] text-xl 3xl:-mt-2 3xl:ml-0 3xl:text-[15px]',
    },
    lg: {
      true: '-ml-0.5 -mt-[18px] text-2xl',
    },
    xl: {
      true: '-ml-0.5 -mt-[22px] text-[32px]',
    },
  },
  defaultVariants: {
    xs: false,
    sm: false,
    smd: false,
    md: false,
    lg: false,
    xl: false,
  },
})

type LevelBadgeProps = VariantProps<typeof badge> &
  VariantProps<typeof levelText> & {
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
  xs,
  sm,
  smd,
  md,
  lg,
  xl,
  className,
}: LevelBadgeProps) {
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
    if (xs) return 'xs'
    if (sm) return 'sm'
    if (smd) return 'smd'
    if (md) return 'md'
    if (lg) return 'lg'
    if (xl) return 'xl'

    return 'md'
  }, [xs, sm, smd, md, lg, xl])

  return (
    <div
      className={badge({
        xs,
        sm,
        smd,
        md,
        lg,
        xl,
        className: twMerge(className, fitParent && 'max-w-full min-w-full'),
      })}
    >
      <div className="absolute h-full w-full items-center justify-center">
        <span className={levelText({ xs, sm, smd, md, lg, xl })}>{level}</span>
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
