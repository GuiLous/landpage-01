import { twMerge } from 'tailwind-merge'

import { getRanking } from '@/functions'

import { RankingHeader, RankingTopPlayersCard } from '@/components/pages'

import { Pagination, RankingTable } from '@/components/shared'
import { FieldsTableType } from '@/components/shared/rankingTable/RankingTableHeader'

const fieldsTable = [
  {
    stat: 'Posição',
    label: 'Posição no top 100',
  },
  {
    stat: 'Nome de usuário',
    label: 'Nome do jogador',
  },
  {
    stat: 'Rank',
    label: 'Nível na reload',
  },
  {
    stat: 'Level',
    label: 'Nível na reload',
  },
  {
    stat: 'Win Rate',
    label: 'Taxa de vitórias',
  },
  {
    stat: 'KDA',
    label: 'Abates, Mortes, Assistências',
  },
]

interface RouteProps {
  searchParams: { page: string }
}

export default async function Ranking({ searchParams }: RouteProps) {
  const { page } = searchParams

  const ranking = await getRanking({ page: page ? Number(page) : 1 })

  const topPlayers = ranking.results.splice(0, 3)

  return (
    <main
      className={twMerge(
        'flex-col gap-10 py-10 px-[4%]',
        '3xl:gap-8',
        'ultrawide:gap-14'
      )}
    >
      <RankingHeader />

      {ranking.current_page <= 1 && (
        <section className={twMerge('flex-initial gap-6', '3xl:gap-4')}>
          {topPlayers.map((player) => (
            <RankingTopPlayersCard key={player.user_id} player={player} />
          ))}
        </section>
      )}

      <RankingTable.Root>
        <RankingTable.Header fieldsTable={fieldsTable as FieldsTableType[]} />

        <RankingTable.Body
          players={ranking.results}
          fieldsColumn={fieldsTable as FieldsTableType[]}
        />
      </RankingTable.Root>

      {ranking?.total_pages > 1 && (
        <div className={twMerge('flex-initial items-end justify-center pb-10')}>
          <Pagination
            totalPages={ranking?.total_pages}
            currentPage={ranking?.current_page}
          />
        </div>
      )}
    </main>
  )
}
