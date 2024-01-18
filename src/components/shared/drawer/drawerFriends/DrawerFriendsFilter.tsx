import { IoSearch } from 'react-icons/io5'

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
  const updateFilter = (value: string) => {
    if (value === '' || value.length <= 3) {
      setSearchFriends([])
    }

    setFilter(value)
  }

  return (
    <div className="flex-initial flex-col items-center gap-6 px-5 pb-4">
      <div className="items-center">
        <Input.Root>
          <Input.Input
            placeholder="Procurar amigos..."
            onChange={(e) => updateFilter(e.target.value)}
            className="max-h-[40px] min-h-[40px]"
            neutral
            value={filter}
          >
            <Input.RightIcon
              icon={IoSearch}
              size={18}
              className="text-gray-300"
            />
          </Input.Input>
        </Input.Root>
      </div>
    </div>
  )
}
