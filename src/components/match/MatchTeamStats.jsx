import {
  Avatar,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { Container } from '@components'

import style from './MatchTeamStats.module.css'

export default function MatchTeamStats({ team, isWinning = false }) {
  const user = useSelector((state) => state.user)

  const players = team.players

  const calculateHsPercent = (player) => {
    const totalShots =
      player.stats.chest_shots +
      player.stats.other_shots +
      player.stats.head_shots

    if (totalShots === 0) return 0

    // calculate head shots percent
    return Number((player.stats.head_shots * 100) / totalShots).toFixed(2)
  }

  const calculateKdr = (player) => {
    if (player.stats.deaths === 0) return 0

    // calculate Kill-Death Ratio number
    return Number(player.stats.kills / player.stats.deaths).toFixed(2)
  }

  const calculateDh = (player) => {
    const totalShots =
      player.stats.chest_shots +
      player.stats.other_shots +
      player.stats.head_shots

    if (totalShots === 0) return 0

    // calculate Damage per Hit Ratio number
    return Number(
      player.stats.damage /
        (player.stats.chest_shots +
          player.stats.other_shots +
          player.stats.head_shots)
    ).toFixed(2)
  }

  const calculateOneVsX = (player) => {
    return (
      player.stats.clutch_v1 +
      player.stats.clutch_v2 +
      player.stats.clutch_v3 +
      player.stats.clutch_v4 +
      player.stats.clutch_v5
    )
  }

  return (
    <TableContainer className={style.tableContainer}>
      <Table bgColor="gray.900">
        <Thead>
          <Tr>
            <Th className={isWinning ? style.winner : style.loser}>
              {team.name}
            </Th>
            <Tooltip label="Abates" aria-label="Abates tooltip">
              <Th>K</Th>
            </Tooltip>
            <Tooltip label="Mortes" aria-label="Mortes tooltip">
              <Th>D</Th>
            </Tooltip>
            <Tooltip label="Assistências" aria-label="Assistências tooltip">
              <Th>A</Th>
            </Tooltip>
            <Tooltip
              label="Tiros na cabeça"
              aria-label="Tiros na cabeça tooltip"
            >
              <Th>HS</Th>
            </Tooltip>
            <Tooltip
              label="Porcentagem de tiros na cabeça"
              aria-label="Porcentagem de tiros na cabeça tooltip"
            >
              <Th>HS%</Th>
            </Tooltip>
            <Tooltip
              label="Bombas plantadas"
              aria-label="Bombas plantadas tooltip"
            >
              <Th>BP</Th>
            </Tooltip>
            <Tooltip
              label="Bombas desarmadas"
              aria-label="Bombas desarmadas tooltip"
            >
              <Th>BD</Th>
            </Tooltip>
            <Tooltip
              label="Primeiros abates"
              aria-label="Primeiros abates tooltip"
            >
              <Th>FK</Th>
            </Tooltip>
            <Tooltip
              label="Abates por morte"
              aria-label="Abates por morte tooltip"
            >
              <Th>KDR</Th>
            </Tooltip>
            <Tooltip
              label="Dano por acerto"
              aria-label="Dano por acerto tooltip"
            >
              <Th>D/A</Th>
            </Tooltip>
            <Tooltip
              label="Total de 2 abates"
              aria-label="Total de 2 abates tooltip"
            >
              <Th>2k</Th>
            </Tooltip>
            <Tooltip
              label="Total de 3 abates"
              aria-label="Total de 3 abates tooltip"
            >
              <Th>3k</Th>
            </Tooltip>
            <Tooltip
              label="Total de 4 abates"
              aria-label="Total de 4 abates tooltip"
            >
              <Th>4k</Th>
            </Tooltip>
            <Tooltip
              label="Total de 5 abates"
              aria-label="Total de 5 abates tooltip"
            >
              <Th>5k</Th>
            </Tooltip>
            <Tooltip
              label="Total de clutches"
              aria-label="Total de clutches tooltip"
            >
              <Th textTransform="initial">1vsX</Th>
            </Tooltip>
          </Tr>
        </Thead>
        <Tbody>
          {players.map((player) => (
            <Tr
              key={player.id}
              className={player.user_id === user.id ? style.highlight : ''}
            >
              <Td className={style.user}>
                <Container align="center" gap={20}>
                  <Container className={style.avatar} fitContent>
                    <Avatar
                      width="40px"
                      height="40px"
                      src={player.avatar?.medium}
                      borderWidth={2}
                    />
                  </Container>

                  <Container className={style.username} column fitContent>
                    <Text fontWeight="semiBold" fontSize={'14px'}>
                      {player.username}
                    </Text>

                    <Text
                      fontSize={'11px'}
                      fontWeight={'medium'}
                      color="gray.700"
                    >
                      LEVEL {player.level}
                    </Text>
                  </Container>
                </Container>
              </Td>
              <Td>{player.stats.kills}</Td>
              <Td>{player.stats.deaths}</Td>
              <Td>{player.stats.assists}</Td>
              <Td>{player.stats.head_shots}</Td>
              <Td data-testid="hs-percentage">{calculateHsPercent(player)}%</Td>
              <Td>{player.stats.plants}</Td>
              <Td>{player.stats.defuses}</Td>
              <Td>{player.stats.firstkills}</Td>
              <Td data-testid="kdr">{calculateKdr(player)}</Td>
              <Td data-testid="dh">{calculateDh(player)}</Td>
              <Td>{player.stats.double_kills}</Td>
              <Td>{player.stats.triple_kills}</Td>
              <Td>{player.stats.quadra_kills}</Td>
              <Td>{player.stats.aces}</Td>
              <Td data-testid="1vsX">{calculateOneVsX(player)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
