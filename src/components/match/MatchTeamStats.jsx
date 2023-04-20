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
  Tr,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { LevelBadge } from '@components'

import style from './MatchTeamStats.module.css'

export default function MatchTeamStats({ team, isWinning = false }) {
  const user = useSelector((state) => state.user)

  // const isMyTeam = team.players.find((player) => player.user_id === user.id)

  const players = team.players

  return (
    <TableContainer className={style.tableContainer}>
      <Table variant="striped" bgColor="gray.600" colorScheme="stripe">
        <Thead>
          <Tr>
            <Th className={isWinning ? style.winning : style.loosing}>
              {team.name}
            </Th>
            <Th>K</Th>
            <Th>D</Th>
            <Th>A</Th>
            <Th>HS</Th>
            <Th>HS%</Th>
            <Th>BP</Th>
            <Th>BD</Th>
            <Th>FK</Th>
            <Th>KDR</Th>
            <Th>D/H</Th>
            <Th>2k</Th>
            <Th>3k</Th>
            <Th>4k</Th>
            <Th>5k</Th>
            <Th textTransform="initial">1vsX</Th>
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
                      <LevelBadge level={player.level} xxsmall />
                    </Box>

                    <Text fontWeight={600}>{player.username}</Text>
                  </HStack>
                </Td>
                <Td>{player.stats.kills}</Td>
                <Td>{player.stats.deaths}</Td>
                <Td>{player.stats.assists}</Td>
                <Td>{player.stats.head_shots}</Td>
                <Td>{hsPercent}%</Td>
                <Td>{player.stats.plants}P</Td>
                <Td>{player.stats.defuses}D</Td>
                <Td>{player.stats.firstkills}</Td>
                <Td>{kdr}</Td>
                <Td>{dh}</Td>
                <Td>{player.stats.double_kills}</Td>
                <Td>{player.stats.triple_kills}</Td>
                <Td>{player.stats.quadra_kills}</Td>
                <Td>{player.stats.aces}</Td>
                <Td>{oneVsX}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
