import { Icon, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'

import { MatchesAPI } from '@api'
import {
  ClockIcon,
  Container,
  FlagIcon,
  LevelProgressBar,
  Loading,
  LoadingBackdrop,
  MatchHistoryStatsLink,
  MatchTeamStats,
} from '@components'
import { StorageService } from '@services'

import style from './Match.module.css'

export default function MatchView() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const match = useSelector((state) => state.match)

  const navigate = useNavigate()
  const params = useParams()

  const { match_id, user_id } = params

  const [fetching, setFetching] = useState(true)
  const [loadedMatch, setLoadedMatch] = useState(null)
  const [matchStats, setMatchStats] = useState(null)

  const firstTeamScore = (loadedMatch && loadedMatch.teams[0].score) || 0
  const secondTeamScore = (loadedMatch && loadedMatch.teams[1].score) || 0

  const isSameScore = firstTeamScore === secondTeamScore

  const statusMap = {
    loading: 'Configurando',
    running: 'Em andamento',
    finished: 'Finalizada',
    cancelled: 'Cancelada',
  }

  const playerOnMatch = loadedMatch?.teams
    .map((team) =>
      team.players.find((player) => player.user_id === Number(user_id))
    )
    .find((player) => player !== undefined)

  const winningTeam = loadedMatch?.teams.reduce((currentTeam, team) => {
    if (team.score > currentTeam.score) {
      return team
    } else {
      return currentTeam
    }
  })

  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await MatchesAPI.detail(userToken, match_id)

      if (response.errorMsg) {
        navigate('/404')
        return
      }

      setLoadedMatch(response)
      setFetching(false)
    }

    if (match) {
      if (parseInt(match_id) === parseInt(match.id)) {
        setLoadedMatch(match)
        setFetching(false)
      } else fetch()
    } else fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match_id, match])

  useEffect(() => {
    if (playerOnMatch && match && match.status === 'cancelled') {
      navigate('/jogar')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match, navigate, playerOnMatch])

  useEffect(() => {
    if (winningTeam && loadedMatch) {
      const player = loadedMatch.teams
        .map((team) =>
          team.players.find((player) => player.user_id === Number(user_id))
        )
        .find((player) => player !== undefined)

      const scoreOne = loadedMatch.teams[0].score
      const scoreTwo = loadedMatch.teams[1].score

      if (player) {
        const matchStats = {
          stats: {
            kda: player.stats.kda,
            kdr: player.stats.kdr,
            head_accuracy: player.stats.head_accuracy,
            adr: player.stats.adr,
            firstkills: player.stats.firstkills,
          },
          id: loadedMatch.id,
          score: `${scoreOne} - ${scoreTwo}`,
          start_date: loadedMatch.start_date,
          end_date: loadedMatch.end_date,
          won: winningTeam.id === player.team_id,
          map_name: loadedMatch.map.name,
          status: loadedMatch.status,
          map_image:
            'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
          game_type: loadedMatch.game_type,
        }

        setMatchStats(matchStats)
      }
    }
  }, [winningTeam, loadedMatch, user_id])

  return fetching || !loadedMatch || !matchStats ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container className={style.container} column gap={isLessThan2xl ? 26 : 28}>
      <Container className={style.header} justify="between" align="center">
        <Container fitContent>
          <Link
            as={RouterLink}
            display="flex"
            alignItems="center"
            gap="8px"
            ml="-6px"
            fontWeight="medium"
            width="fit-content"
            to={`/perfil/${user_id}`}
          >
            <IoIosArrowRoundBack size={31} />
            <Text textTransform="capitalize" fontSize={14}>
              Voltar
            </Text>
          </Link>
        </Container>

        <Container align="center" gap={12} style={{ maxWidth: 'fit-content' }}>
          {loadedMatch.status === 'running' ? (
            <Icon as={ClockIcon} />
          ) : (
            <Icon as={FlagIcon} />
          )}

          <Container gap={5}>
            <Text fontWeight="regular" lineHeight={1}>
              Partida
            </Text>
            <Text fontWeight="bold" lineHeight={1}>
              {statusMap[loadedMatch.status]}
            </Text>
          </Container>
        </Container>
      </Container>

      <Container
        column
        gap={isLessThan2xl ? 22 : 24}
        className={style.statsContainer}
      >
        <Container gap={isLessThan2xl ? 22 : 24} className={style.statsHeader}>
          <MatchHistoryStatsLink
            isLink={false}
            match={matchStats}
            userId={user_id}
          />

          {playerOnMatch && loadedMatch.status === 'finished' && (
            <Container className={style.progressBar}>
              <LevelProgressBar {...playerOnMatch.progress} />
            </Container>
          )}
        </Container>

        {user_id &&
          loadedMatch?.teams.map((team) => (
            <MatchTeamStats
              key={team.id}
              team={team}
              isWinning={winningTeam.id === team.id}
              isSameScore={isSameScore}
              userId={user_id}
            />
          ))}
      </Container>
    </Container>
  )
}
