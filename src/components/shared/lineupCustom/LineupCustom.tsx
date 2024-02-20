import { twMerge } from 'tailwind-merge'

import { WeaponsName } from '@/utils'

import { LineupPlayBtn, Select } from '@/components/shared'

import { LineupCustomMap } from './LineupCustomMap'
import { LineupCustomPlayersWrapper } from './LineupCustomPlayersWrapper'

export function LineupCustom() {
  return (
    <section className="flex-col items-center justify-center gap-10 px-[10%]">
      <div className="flex-col gap-8">
        <div className="grid flex-initial grid-cols-3 gap-x-6 gap-y-4">
          <LineupCustomMap />

          <Select.Root name="mode">
            <Select.Trigger className="border-transparent bg-gray-800/60 text-sm">
              <Select.Prefix prefix="modo" />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="Plante e desarme">
                <Select.ItemText className="text-sm ">
                  plante e desarme
                </Select.ItemText>
              </Select.Item>

              <Select.Item value="Death match">
                <Select.ItemText className="text-sm ">
                  Death match
                </Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root name="weapons">
            <Select.Trigger className="border-transparent bg-gray-800/60 text-sm">
              <Select.Prefix prefix="armas" />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="Todos">
                <Select.ItemText className="text-sm ">Todos</Select.ItemText>
              </Select.Item>

              {WeaponsName.map((weapon) => (
                <Select.Item key={weapon} value={weapon}>
                  <Select.ItemText className="text-sm ">
                    {weapon}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <Select.Root name="map">
            <Select.Trigger className="border-transparent bg-gray-800/60 text-sm">
              <Select.Prefix prefix="mapa" />
              <Select.Value placeholder="" />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="Auditório">
                <Select.ItemText className="text-sm ">
                  Auditório
                </Select.ItemText>
              </Select.Item>

              <Select.Item value="Porto">
                <Select.ItemText className="text-sm ">Porto</Select.ItemText>
              </Select.Item>

              <Select.Item value="Favela">
                <Select.ItemText className="text-sm ">Favela</Select.ItemText>
              </Select.Item>
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
        <LineupPlayBtn isOwner />
      </div>
    </section>
  )
}
