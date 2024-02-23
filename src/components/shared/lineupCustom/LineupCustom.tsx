'use client'

import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { WeaponIndexType } from '@/utils'

import { Lobby, MatchType, useLobbyStore } from '@/store/lobbyStore'

import { QueueOptionsType, lobbyApi } from '@/modelsApi'

import {
  LineupPlayBtn,
  Select,
  SkeletonLineupCustom,
} from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import { LineupCustomMap } from './LineupCustomMap'
import { LineupCustomPlayersWrapper } from './LineupCustomPlayersWrapper'

type OptionToUpdateType = 'match_type' | 'map' | 'weapon'

export function LineupCustom() {
  const { lobby } = useLobbyStore()

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [isFetching, setIsFetching] = useState(true)
  const [lobbyDetails, setLobbyDetails] = useState<Lobby | null>(null)

  const selectedMap = lobbyDetails?.map_choices?.find(
    (map) => map.id === lobbyDetails.map_id
  )

  const isLobbyOwner = auth?.id === lobby?.id

  const hasNoDefPlayers = lobby?.def_players?.length === 0

  const hasNoAtkPlayers = lobby?.atk_players?.length === 0

  const disableButton = hasNoAtkPlayers && hasNoDefPlayers

  const getCustomLobbyDetails = useCallback(async () => {
    if (!auth?.token || !lobby?.id) return

    const response = await lobbyApi.detail(auth.token, lobby.id, {
      cache: 'no-cache',
    })

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
      setIsFetching(false)
      return
    }

    setLobbyDetails(response)
    setIsFetching(false)
  }, [auth?.token, lobby?.id, showErrorToast])

  const handleUpdateOptions = useCallback(
    async (optionTouUpdate: OptionToUpdateType, value: string) => {
      if (!auth?.token || !lobby?.id || !lobbyDetails) return

      const payload = {} as QueueOptionsType

      switch (optionTouUpdate) {
        case 'match_type':
          payload.match_type = value as MatchType
          break
        case 'map':
          payload.map_id = Number(value)
          break
        case 'weapon':
          payload.weapon = value === 'null' ? 'all' : (value as WeaponIndexType)
          break
        default:
          break
      }

      const response = await lobbyApi.updateQueueOptions(
        auth.token,
        lobby.id,
        payload
      )

      if (response.errorMsg) {
        return showErrorToast(response.errorMsg)
      }

      setLobbyDetails(response)
    },
    [auth?.token, lobby?.id, lobbyDetails, showErrorToast]
  )

  useEffect(() => {
    getCustomLobbyDetails()
  }, [getCustomLobbyDetails])

  return isFetching ? (
    <SkeletonLineupCustom />
  ) : (
    <section className="flex-col items-center justify-center gap-10 px-[10%]">
      <div className="flex-col gap-8">
        <div className="grid flex-initial grid-cols-3 gap-x-6 gap-y-4">
          <LineupCustomMap
            thumbnail={selectedMap?.thumbnail ? selectedMap.thumbnail : ''}
          />

          <Select.Root
            name="match_type"
            value={lobbyDetails?.match_type}
            onValueChange={(value) => handleUpdateOptions('match_type', value)}
          >
            <Select.Trigger className="border-transparent bg-gray-800/60 text-sm">
              <Select.Prefix prefix="modo" />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              {lobbyDetails?.match_type_choices?.map((match_type) => (
                <Select.Item key={match_type[0]} value={match_type[0]}>
                  <Select.ItemText className="text-sm ">
                    {match_type[1]}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <Select.Root
            name="weapons"
            value={
              lobbyDetails?.weapon === null ? 'null' : lobbyDetails?.weapon
            }
            onValueChange={(value) => handleUpdateOptions('weapon', value)}
          >
            <Select.Trigger className="border-transparent bg-gray-800/60 text-sm">
              <Select.Prefix prefix="armas" />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value={'null'}>
                <Select.ItemText className="text-sm ">Todos</Select.ItemText>
              </Select.Item>

              {lobbyDetails?.weapon_choices?.map((weapon) => (
                <Select.Item key={weapon[1]} value={weapon[0]}>
                  <Select.ItemText className="text-sm ">
                    {weapon[0]}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <Select.Root
            name="map"
            value={String(lobbyDetails?.map_id)}
            onValueChange={(value) => handleUpdateOptions('map', value)}
          >
            <Select.Trigger className="border-transparent bg-gray-800/60 text-sm">
              <Select.Prefix prefix="mapa" />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              {lobbyDetails?.map_choices?.map((map) => (
                <Select.Item key={map.id} value={String(map.id)}>
                  <Select.ItemText className="text-sm ">
                    {map.name}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <LineupCustomPlayersWrapper />
      </div>

      <div
        className={twMerge(
          'max-w-[280px] flex-initial',
          'ultrawide:max-w-[532px]'
        )}
      >
        <LineupPlayBtn
          isOwner={isLobbyOwner}
          disabled={disableButton}
          lobbyMode="custom"
          tooltipLabel={
            disableButton
              ? 'Para iniciar a partida, pelo menos um jogador precisa estar em uma das equipe.'
              : undefined
          }
        />
      </div>
    </section>
  )
}
