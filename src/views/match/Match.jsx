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

export default function MatchView(props) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const match = useSelector((state) => state.match)

  const params = useParams()
  const matchId = params.matchId
  const [fetching, setFetching] = useState(true)
  const [loadedMatch, setLoadedMatch] = useState(null)

  const statusMap = {
    loading: 'Configurando',
    running: 'Em andamento',
    finished: 'Finalizada',
    canceled: 'Cancelada',
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
  }, [matchId])

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
                loadedMatch.teams[0].score > loadedMatch.teams[1].score
                  ? style.winner
                  : style.loser,
              ].join(' ')}
            >
              {loadedMatch.teams[0].score}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>vs</Text>
            <Text
              className={[
                style.teamScore,
                loadedMatch.teams[1].score > loadedMatch.teams[0].score
                  ? style.winner
                  : style.loser,
              ].join(' ')}
            >
              {loadedMatch.teams[1].score}
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
          />
        ))}
      </Container>
    </Container>
  )
}
