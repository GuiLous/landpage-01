import { DateTime } from 'luxon'
import React from 'react'

import { Container, Timer } from '@components'

import { Box, Tooltip } from '@chakra-ui/react'
import style from './MatchInfos.module.css'

export default function MatchInfos({ match }) {
  const typeMap = {
    competitive: 'Ranked',
    custom: 'Personalizada',
  }

  const modeMap = {
    1: '1x1',
    5: '5x5',
    20: '20x20',
  }

  const startDate = DateTime.fromISO(match.start_date)
  const endDate = match.end_date && DateTime.fromISO(match.end_date)
  const elapsedTime = Math.floor(
    endDate
      ? endDate.diff(startDate, 'seconds').seconds
      : DateTime.now().diff(startDate, 'seconds').seconds
  )

  return (
    <Container className={style.container}>
      <Container>
        <Container justify="center">
          <Tooltip label="Modo de Jogo" aria-label="Modo de Jogo">
            <Box>
              {typeMap[match.game_type]} {modeMap[match.game_mode]}
            </Box>
          </Tooltip>
        </Container>

        <Container justify="center">
          <Tooltip label="Mapa" aria-label="Mapa">
            <Box>teste</Box>
          </Tooltip>
        </Container>
      </Container>

      <Container justify="center">
        <Tooltip label="Duração" aria-label="Duração">
          <Box>
            {match.start_date ? (
              <Timer initialTime={elapsedTime} stop={endDate} />
            ) : (
              '-'
            )}
          </Box>
        </Tooltip>
      </Container>

      <Container>
        <Container justify="center">
          <Tooltip label="Iniciada em" aria-label="Iniciada em">
            <Box>{match.start_date ? startDate.toFormat('D T') : '-'}</Box>
          </Tooltip>
        </Container>
        <Container justify="center">
          <Tooltip label="Finalizada em" aria-label="Finalizada em">
            <Box>{endDate ? endDate.toFormat('D T') : '-'}</Box>
          </Tooltip>
        </Container>
      </Container>
    </Container>
  )
}
