import { KeyboardEvent, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { IoSearch } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'

import { friendsApi } from '@/modelsApi'

import { Input } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface DrawerFriendsFilterProps {
  showFriendsBtn: boolean
  filter: string
  setFilter: (value: string) => void
}

export function DrawerFriendsFilter({
  setFilter,
  filter,
  showFriendsBtn,
}: DrawerFriendsFilterProps) {
  const auth = useAuth()

  const [isFetching, setIsFetching] = useState(false)

  const updateFilter = (value: string) => setFilter(value)

  const showErrorToast = useShowErrorToast()

  const handleKeyEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isFetching && showFriendsBtn) addFriend()
  }

  const addFriend = async () => {
    if (isFetching || !auth?.token) return

    setIsFetching(true)

    const response = await friendsApi.add(auth.token, filter)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setIsFetching(false)
      return
    }

    setFilter('')

    useAppStore.getState().addToast({
      content: `Solicitação enviada para ${filter}`,
      variant: 'success',
    })

    setIsFetching(false)

    revalidatePath({ path: '/' })
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
            onKeyDown={handleKeyEnterDown}
            value={filter}
          >
            {!showFriendsBtn ? (
              <Input.RightIcon
                icon={IoSearch}
                size={18}
                className="text-gray-300"
              />
            ) : (
              <Input.RightIcon
                icon={BiPlus}
                size={22}
                className={twMerge(
                  'text-gray-300 group-focus-within:text-gray-300 transition-colors cursor-pointer',
                  'hover:text-white hover:group-focus-within:text-inherit'
                )}
                onClick={isFetching ? undefined : addFriend}
              />
            )}
          </Input.Input>
        </Input.Root>
      </div>
    </div>
  )
}
