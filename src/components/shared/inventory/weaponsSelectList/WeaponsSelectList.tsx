import { twMerge } from 'tailwind-merge'

import { WeaponNameType, WeaponType, weapons } from '@/utils'

import { WeaponsSelectListCard } from './WeaponsSelectListCard'

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
  const handleChangeItemSelected = (weaponName: WeaponNameType) => {
    setWeaponSelected(weaponName)
  }

  return (
    <div className={twMerge('flex-col gap-4')}>
      {weapons[activeSubTab].map((item, index) => (
        <WeaponsSelectListCard
          key={index}
          item={item}
          weaponSelected={weaponSelected}
          onClick={() => handleChangeItemSelected(item.name as WeaponNameType)}
        />
      ))}
    </div>
  )
}
