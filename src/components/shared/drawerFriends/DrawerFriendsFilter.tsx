import { IoSearch } from 'react-icons/io5'

import { Input } from '@/components/shared'

interface DrawerFriendsFilterProps {
  setFilter: (value: string) => void
}

export function DrawerFriendsFilter({ setFilter }: DrawerFriendsFilterProps) {
  const updateFilter = (value: string) => setFilter(value)

  return (
    <div className="flex-initial flex-col items-center gap-6 px-5 pb-4">
      <div className="items-center">
        <Input.Root>
          <Input.Input
            placeholder="Procurar amigos..."
            onChange={(e) => updateFilter(e.target.value)}
            className="max-h-[40px] min-h-[40px]"
            neutral
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
