'use client'

import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { WeaponIndexType } from '@/utils'

import { MatchType, useLobbyStore } from '@/store/lobbyStore'

import { QueueOptionsType, lobbyApi } from '@/modelsApi'

import {
  LineupPlayBtn,
  Select,
  SkeletonLineupCustomMap,
} from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import { LineupCustomMap } from './LineupCustomMap'
import { LineupCustomPlayersWrapper } from './LineupCustomPlayersWrapper'

type OptionToUpdateType = 'match_type' | 'map' | 'weapon'

export function LineupCustom() {
  const { lobby } = useLobbyStore()

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [updatingOptions, setUpdatingOption] =
    useState<OptionToUpdateType | null>(null)

  const selectedMap = lobby?.map_choices?.find((map) => map.id === lobby.map_id)

  const isLobbyOwner = auth?.id === lobby?.id

  const hasNoDefPlayers = lobby?.def_players?.length === 0

  const hasNoAtkPlayers = lobby?.atk_players?.length === 0

  const disableButton = hasNoAtkPlayers && hasNoDefPlayers

  const isMatchTypeDefault = lobby?.match_type === 'default'

  const handleUpdateOptions = useCallback(
    async (optionTouUpdate: OptionToUpdateType, value: string) => {
      if (!auth?.token || !lobby?.id) return

      const payload = {} as QueueOptionsType

      switch (optionTouUpdate) {
        case 'match_type':
          setUpdatingOption('match_type')
          payload.match_type = value as MatchType
          break
        case 'map':
          setUpdatingOption('map')
          payload.map_id = Number(value)
          break
        case 'weapon':
          setUpdatingOption('weapon')
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
        showErrorToast(response.errorMsg)
        setUpdatingOption(null)
        return
      }

      setUpdatingOption(null)
    },
    [auth?.token, lobby?.id, showErrorToast]
  )

  const isUpdatingOptions = !!updatingOptions

  return !lobby?.map_choices ? (
    <SkeletonLineupCustomMap />
  ) : (
    <section className="flex-col items-center justify-center gap-10 px-[10%]">
      <div className="flex-col gap-8">
        <div className="grid flex-initial grid-cols-3 gap-x-6 gap-y-4">
          {updatingOptions === 'map' ? (
            <SkeletonLineupCustomMap />
          ) : (
            <LineupCustomMap
              thumbnail={selectedMap?.thumbnail ? selectedMap.thumbnail : ''}
            />
          )}

          <Select.Root
            name="match_type"
            value={lobby?.match_type}
            disabled={!isLobbyOwner || isUpdatingOptions}
            onValueChange={(value) => handleUpdateOptions('match_type', value)}
          >
            <Select.Trigger
              className={twMerge(
                'border-transparent bg-gray-800/60 text-sm',
                'disabled:bg-gray-1100 disabled:border-transparent',
                isUpdatingOptions &&
                  'disabled:bg-gray-1100 disabled:border-transparent'
              )}
            >
              <Select.Prefix
                prefix="modo"
                className={twMerge(
                  (!isLobbyOwner || isUpdatingOptions) && 'opacity-60'
                )}
              />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              {lobby?.match_type_choices?.map((match_type) => (
                <Select.Item key={match_type[0]} value={match_type[0]}>
                  <Select.ItemText
                    className={twMerge(
                      'text-sm',
                      (!isLobbyOwner || isUpdatingOptions) && 'opacity-60'
                    )}
                  >
                    {match_type[1] === 'Default' && 'Padrão'}
                    {match_type[1] !== 'Default' && match_type[1]}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <Select.Root
            name="weapons"
            value={lobby?.weapon === null ? 'null' : lobby?.weapon}
            disabled={!isLobbyOwner || isUpdatingOptions || isMatchTypeDefault}
            onValueChange={(value) => handleUpdateOptions('weapon', value)}
          >
            <Select.Trigger
              className={twMerge(
                'border-transparent bg-gray-800/60 text-sm',
                'disabled:bg-gray-1100 disabled:border-transparent',
                isUpdatingOptions &&
                  'disabled:bg-gray-1100 disabled:border-transparent'
              )}
            >
              <Select.Prefix
                prefix="armas"
                className={twMerge(
                  (!isLobbyOwner || isUpdatingOptions || isMatchTypeDefault) &&
                    'opacity-60'
                )}
              />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value={'null'}>
                <Select.ItemText
                  className={twMerge(
                    'text-sm',
                    (!isLobbyOwner ||
                      isUpdatingOptions ||
                      isMatchTypeDefault) &&
                      'opacity-60'
                  )}
                >
                  Todas
                </Select.ItemText>
              </Select.Item>

              {!isMatchTypeDefault &&
                lobby?.weapon_choices?.map((weapon) => (
                  <Select.Item key={weapon[1]} value={weapon[0]}>
                    <Select.ItemText
                      className={twMerge(
                        'text-sm',
                        (!isLobbyOwner || isUpdatingOptions) && 'opacity-60'
                      )}
                    >
                      {weapon[0]}
                    </Select.ItemText>
                  </Select.Item>
                ))}
            </Select.Content>
          </Select.Root>

          <Select.Root
            name="map"
            value={String(lobby?.map_id)}
            disabled={!isLobbyOwner || isUpdatingOptions}
            onValueChange={(value) => handleUpdateOptions('map', value)}
          >
            <Select.Trigger
              className={twMerge(
                'border-transparent bg-gray-800/60 text-sm',
                'disabled:bg-gray-1100 disabled:border-transparent',
                isUpdatingOptions &&
                  'disabled:bg-gray-1100 disabled:border-transparent'
              )}
            >
              <Select.Prefix
                prefix="mapa"
                className={twMerge(
                  (!isLobbyOwner || isUpdatingOptions) && 'opacity-60'
                )}
              />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              {lobby?.map_choices?.map((map) => (
                <Select.Item key={map.id} value={String(map.id)}>
                  <Select.ItemText
                    className={twMerge(
                      'text-sm',
                      (!isLobbyOwner || isUpdatingOptions) && 'opacity-60'
                    )}
                  >
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
