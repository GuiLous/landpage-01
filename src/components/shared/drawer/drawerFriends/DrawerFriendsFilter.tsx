import { useCallback } from 'react'
import { IoSearch } from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { Input } from '@/components/shared'

interface DrawerFriendsFilterProps {
  filter: string
  setFilter: (state: string) => void
  setSearchFriends: (state: Friend[]) => void
}

export function DrawerFriendsFilter({
  setFilter,
  filter,
  setSearchFriends,
}: DrawerFriendsFilterProps) {
  const isFilterEmpty = filter === ''

  const updateFilter = (value: string) => {
    if (value === '' || value.length <= 3) {
      setSearchFriends([])
    }

    setFilter(value)
  }

  const handleRemoveFilter = useCallback(() => {
    if (!isFilterEmpty) setFilter('')
  }, [setFilter, isFilterEmpty])

  return (
    <div className="flex-initial flex-col items-center gap-6 px-5 pb-4">
      <div className="items-center">
        <Input.Root>
          <Input.Input
            placeholder="Procurar amigos..."
            onChange={(e) => updateFilter(e.target.value)}
            className={twMerge(
              'max-h-[40px] min-h-[40px]',
              'ultrawide:min-h-14 ultrawide:max-h-14 ultrawide:text-2xl'
            )}
            neutral
            value={filter}
          >
            <Input.Icon
              icon={isFilterEmpty ? IoSearch : RxCross1}
              className={twMerge(
                'text-gray-300 text-lg transition-colors',
                !isFilterEmpty &&
                  'hover:group-hover:text-gray-300 hover:cursor-pointer',
                'ultrawide:text-2xl'
              )}
              onClick={handleRemoveFilter}
            />
          </Input.Input>
        </Input.Root>
      </div>
    </div>
  )
}
