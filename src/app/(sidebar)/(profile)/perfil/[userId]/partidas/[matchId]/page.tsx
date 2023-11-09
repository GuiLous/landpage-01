import { twMerge } from 'tailwind-merge'

import { MatchProfileType, getMatchDetails } from '@/functions'

import {
  MatchDetailsHeader,
  MatchDetailsHeaderStatus,
  MatchDetailsRedirect,
} from '@/components/pages'

import {
  LevelProgressBar,
  MatchStatsTable,
  ProfileMatchStatsLink,
} from '@/components/shared'

type Params = {
  matchId: string
  userId: string
}

interface RouteProps {
  params: Params
}

export default async function MatchDetails({ params }: RouteProps) {
  const { matchId, userId } = params

  const matchDetails = await getMatchDetails(Number(matchId))

  const firstTeamScore = matchDetails.teams[0].score || 0
  const secondTeamScore = matchDetails.teams[1].score || 0

  const isSameScore = firstTeamScore === secondTeamScore

  const playerOnMatch = matchDetails.teams
    .map((team) =>
      team.players.find((player) => player.user_id === Number(userId))
    )
    .find((player) => player !== undefined)

  const winningTeam = matchDetails.teams.reduce((currentTeam, team) => {
    if (team.score > currentTeam.score) {
      return team
    }

    return currentTeam
  })

  let matchStats: MatchProfileType | null = null

  if (playerOnMatch) {
    matchStats = {
      stats: {
        kda: `${playerOnMatch.stats.kills}/${playerOnMatch.stats.deaths}/${playerOnMatch.stats.assists}`,
        kdr: playerOnMatch.stats.kdr,
        head_accuracy: playerOnMatch.stats.head_accuracy,
        adr: playerOnMatch.stats.adr,
        firstkills: playerOnMatch.stats.firstkills,
      },
      id: matchDetails.id,
      score: `${firstTeamScore} - ${secondTeamScore}`,
      start_date: matchDetails.start_date,
      end_date: matchDetails.end_date,
      won: winningTeam.id === playerOnMatch.team_id,
      map_name: matchDetails.map.name,
      status: matchDetails.status,
      map_image:
        'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
      game_type: matchDetails.game_type,
    }
  }

  return (
    <main className={twMerge('flex-col gap-7 py-10 px-[4%]', '3xl:gap-6')}>
      <MatchDetailsHeader user_id={Number(userId)}>
        <MatchDetailsHeaderStatus
          status={matchDetails.status}
          server_ip={matchDetails.server_ip}
        />
      </MatchDetailsHeader>

      <div
        className={twMerge(
          'flex-col gap-6 flex-initial bg-gray-1100 rounded-lg p-6',
          '3xl:gap-5'
        )}
      >
        <section
          className={twMerge('gap-6 flex-initial', '3xl:gap-5 3xl:flex-col')}
        >
          {matchStats && (
            <ProfileMatchStatsLink
              match={matchStats}
              userId={Number(userId)}
              isLink={false}
            />
          )}

          {playerOnMatch && (
            <div
              className={twMerge(
                'min-h-[82px] min-w-[38%] max-w-fit items-center rounded bg-gray-800/80 px-3.5',
                '3xl:max-w-full'
              )}
            >
              <LevelProgressBar {...playerOnMatch.progress} />
            </div>
          )}
        </section>

        {matchDetails?.teams.map((team) => (
          <MatchStatsTable.Root key={team.id}>
            <MatchStatsTable.Header
              isSameScore={isSameScore}
              isWinning={winningTeam.id === team.id}
              teamName={team.name}
            />

            <MatchStatsTable.Body
              players={team.players}
              userId={Number(userId)}
            />
          </MatchStatsTable.Root>
        ))}
      </div>

      <MatchDetailsRedirect playerOnMatch={playerOnMatch} />
    </main>
  )
}
