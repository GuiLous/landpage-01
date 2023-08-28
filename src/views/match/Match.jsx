import { Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { MatchesAPI } from '@api'
import {
  ClockIcon,
  Container,
  FlagIcon,
  LevelProgressBar,
  Loading,
  LoadingBackdrop,
  MatchInfos,
  MatchTeamStats,
} from '@components'
import { StorageService } from '@services'

import style from './Match.module.css'

export default function MatchView() {
  const user = useSelector((state) => state.user)
  const match = useSelector((state) => state.match)

  const navigate = useNavigate()
  const params = useParams()

  const matchId = params.matchId

  const [fetching, setFetching] = useState(true)
  const [loadedMatch, setLoadedMatch] = useState(null)

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
    .map((team) => team.players.find((player) => player.user_id === user.id))
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

      const response = await MatchesAPI.detail(userToken, matchId)

      if (response.errorMsg) {
        navigate('/404')
        return
      }

      setLoadedMatch(response)
      setFetching(false)
    }

    if (match) {
      if (parseInt(matchId) === parseInt(match.id)) {
        setLoadedMatch(match)
        setFetching(false)
      } else fetch()
    } else fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId, match])

  useEffect(() => {
    if (playerOnMatch && match && match.status === 'cancelled') {
      navigate('/jogar')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match, navigate, playerOnMatch])

  return fetching || !loadedMatch ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container className={style.container} column gap={25}>
      <Container className={style.header} justify="around" align="center">
        <Container className={style.title} align="center" gap={14}>
          {loadedMatch.status === 'running' ? (
            <Icon as={ClockIcon} />
          ) : (
            <Icon as={FlagIcon} />
          )}

          <Container gap={5}>
            <Text>Partida</Text>
            <Text fontWeight="bold">{statusMap[loadedMatch.status]}</Text>
          </Container>
        </Container>

        <Container
          className={style.score}
          justify="end"
          gap={24}
          align="center"
        >
          <Text className={style.teamName}>
            Time {loadedMatch.teams[0].name}
          </Text>
          <Container fitContent gap={14} align="center">
            <Text
              className={[
                style.teamScore,
                isSameScore && '',
                firstTeamScore > secondTeamScore && style.winner,
                firstTeamScore < secondTeamScore && style.loser,
              ].join(' ')}
            >
              {firstTeamScore}
            </Text>
            <Text fontWeight="bold" fontSize="32px">
              :
            </Text>
            <Text
              className={[
                style.teamScore,
                isSameScore && '',
                secondTeamScore > firstTeamScore && style.winner,
                secondTeamScore < firstTeamScore && style.loser,
              ].join(' ')}
            >
              {secondTeamScore}
            </Text>
          </Container>
          <Text className={style.teamName}>
            Time {loadedMatch.teams[1].name}
          </Text>
        </Container>
      </Container>

      {playerOnMatch && loadedMatch.status === 'finished' && (
        <LevelProgressBar {...playerOnMatch.progress} />
      )}

      <MatchInfos match={loadedMatch} />

      <Container column gap={18}>
        {loadedMatch?.teams.map((team) => (
          <MatchTeamStats
            key={team.id}
            team={team}
            isWinning={winningTeam.id === team.id}
            isSameScore={isSameScore}
          />
        ))}
      </Container>
    </Container>
  )
}
