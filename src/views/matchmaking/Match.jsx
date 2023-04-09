import { Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Loading, LoadingBackdrop } from '@components'
import { MainLayout } from '@layouts'
import { HttpService, StorageService, Toast } from '@services'

import style from './Match.module.css'

export default function MatchView(props) {
  const params = useParams()
  const matchId = params.matchId
  const [fetching, setFetching] = useState(true)
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const token = StorageService.get('token')
      let response

      response = await HttpService.get(`matches/${matchId}/`, token)
      if (response.errorMsg) {
        Toast({
          title: 'Oops, ocorreu um erro',
          description: response.errorMsg,
          status: 'error',
        })
        return
      }

      setMatch(response)
      setFetching(false)
    }

    matchId && fetch()
  }, [matchId])

  const statusMap = {
    loading: 'Configurando',
    running: 'Em andamento',
    finished: 'Finalizada',
    canceled: 'Cancelada',
  }

  return fetching || !match ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <MainLayout>
      <Container className={style.container} column gap={18}>
        <Container className={style.header} justify="around" align="center">
          <Container className={style.title} align="center">
            <Text>
              Partida{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {statusMap[match.status]}
              </span>
            </Text>
          </Container>

          <Container
            className={style.score}
            justify="end"
            gap={26}
            align="center"
          >
            <Text className={style.teamName}>{match.teams[0].name}</Text>
            <Text
              className={[
                style.teamScore,
                match.teams[0].score > match.teams[1].score
                  ? style.winner
                  : style.loser,
              ].join(' ')}
            >
              {match.teams[0].score}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>vs</Text>
            <Text
              className={[
                style.teamScore,
                match.teams[1].score > match.teams[0].score
                  ? style.winner
                  : style.loser,
              ].join(' ')}
            >
              {match.teams[1].score}
            </Text>
            <Text className={style.teamName}>{match.teams[1].name}</Text>
          </Container>
        </Container>
      </Container>
    </MainLayout>
  )
}
