'use client'

import { twMerge } from 'tailwind-merge'

import { WeaponNameType, WeaponType, weapons } from '@/utils'

import { useAudio } from '@/hooks'

import { WeaponsSelectListCard } from './WeaponsSelectListCard'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface WeaponsSelectListProps {
  weaponSelected: WeaponNameType
  activeSubTab: WeaponType
  setWeaponSelected: (state: WeaponNameType) => void
}

export function WeaponsSelectList({
  weaponSelected,
  activeSubTab,
  setWeaponSelected,
}: WeaponsSelectListProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const handleChangeItemSelected = (weaponName: WeaponNameType) => {
    playSoundClick()
    setWeaponSelected(weaponName)
  }

  return (
    <div className={twMerge('flex-col gap-4', '3xl:gap-2.5')}>
      {weapons[activeSubTab].map((item, index) => (
        <WeaponsSelectListCard
          key={index}
          item={item}
          weaponSelected={weaponSelected}
          onMouseEnter={
            item?.name !== weaponSelected ? playSoundHover : undefined
          }
          onClick={() => handleChangeItemSelected(item.name as WeaponNameType)}
        />
      ))}
    </div>
  )
}
