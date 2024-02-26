import { twMerge } from 'tailwind-merge'

import { MatchProfileType, getMatchDetails } from '@/functions'

import { Match, useMatchStore } from '@/store/matchStore'

import {
  LevelProgressBarWrapper,
  MatchDetailsHeader,
  MatchDetailsHeaderStatus,
  MatchDetailsRedirect,
} from '@/components/pages'

import { MatchStatsTable, ProfileMatchStatsLink } from '@/components/shared'

type Params = {
  matchId: string
  userId: string
}

interface RouteProps {
  params: Params
}

export default async function MatchDetails({ params }: RouteProps) {
  const match = useMatchStore.getState().match

  const { matchId, userId } = params

  let matchDetails: Match | null = match

  if (!match) {
    matchDetails = await getMatchDetails(Number(matchId))
  }

  if (!matchDetails) return null

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
      map_image: matchDetails.map.thumbnail,
      game_mode: matchDetails.game_mode,
    }
  }

  const playersFirstRowLength = matchDetails?.teams[0]?.players?.length

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
            <LevelProgressBarWrapper {...playerOnMatch.progress} />
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
              playersFirstRowLength={playersFirstRowLength}
              isPlayersEmpty={team.players.length === 0}
            />
          </MatchStatsTable.Root>
        ))}
      </div>

      <MatchDetailsRedirect playerOnMatch={playerOnMatch} />
    </main>
  )
}
