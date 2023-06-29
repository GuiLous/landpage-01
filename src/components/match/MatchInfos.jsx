import { DateTime } from 'luxon'
import React from 'react'

import { Container, Timer } from '@components'

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
          {typeMap[match.game_type]} {modeMap[match.game_mode]}
        </Container>
        <Container justify="center">Auditório</Container>
      </Container>

      <Container justify="center">
        <Timer initialTime={elapsedTime} stop={endDate} />
      </Container>

      <Container>
        <Container justify="center">{startDate.toFormat('D T')}</Container>
        <Container justify="center">
          {endDate ? endDate.toFormat('D T') : '-'}
        </Container>
      </Container>
    </Container>
  )
}
