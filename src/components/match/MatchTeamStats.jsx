import {
  Avatar,
  Box,
  HStack,
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

import { LevelBadge } from '@components'

import style from './MatchTeamStats.module.css'

export default function MatchTeamStats({ team, isWinning = false }) {
  const user = useSelector((state) => state.user)

  const players = team.players

  return (
    <TableContainer className={style.tableContainer}>
      <Table variant="striped" bgColor="gray.900" colorScheme="stripe">
        <Thead>
          <Tr>
            <Th className={isWinning ? style.winning : style.loosing}>
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
          {players.map((player) => {
            // calculate head shots percent
            const hsPercent = Number(
              (player.stats.head_shots * 100) /
                (player.stats.chest_shots +
                  player.stats.other_shots +
                  player.stats.head_shots)
            ).toFixed(2)

            // calculate Kill-Death Ratio number
            const kdr = Number(
              player.stats.kills / player.stats.deaths
            ).toFixed(2)

            // calculate Damage per Hit Ratio number
            const dh = Number(
              player.stats.damage /
                (player.stats.chest_shots +
                  player.stats.other_shots +
                  player.stats.head_shots)
            ).toFixed(2)

            // calculate total clutches
            const oneVsX =
              player.stats.clutch_v1 +
              player.stats.clutch_v2 +
              player.stats.clutch_v3 +
              player.stats.clutch_v4 +
              player.stats.clutch_v5

            return (
              <Tr
                key={player.id}
                className={player.user_id === user.id ? style.highlight : ''}
              >
                <Td className={style.user}>
                  <HStack>
                    <Avatar
                      variant="online"
                      width="40px"
                      height="40px"
                      src={player.avatar?.small}
                      borderWidth={2}
                    />

                    <Box className={style.level}>
                      <LevelBadge level={player.level} xsmall />
                    </Box>

                    <Text fontWeight={600} fontSize={'14px'}>
                      {player.username}
                    </Text>
                  </HStack>
                </Td>
                <Td>{player.stats.kills}</Td>
                <Td>{player.stats.deaths}</Td>
                <Td>{player.stats.assists}</Td>
                <Td>{player.stats.head_shots}</Td>
                <Td data-testid="hs-percentage">{hsPercent}%</Td>
                <Td>{player.stats.plants}</Td>
                <Td>{player.stats.defuses}</Td>
                <Td>{player.stats.firstkills}</Td>
                <Td data-testid="kdr">{kdr}</Td>
                <Td data-testid="dh">{dh}</Td>
                <Td>{player.stats.double_kills}</Td>
                <Td>{player.stats.triple_kills}</Td>
                <Td>{player.stats.quadra_kills}</Td>
                <Td>{player.stats.aces}</Td>
                <Td data-testid="1vsX">{oneVsX}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
