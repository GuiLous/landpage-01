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
  useMediaQuery,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container, UserMenuOptions } from '@components'

import style from './MatchTeamStats.module.css'

export default function MatchTeamStats({ team, isWinning, isSameScore }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const invites = useSelector((state) => state.invites)

  const navigate = useNavigate()
  const trRef = useRef(null)

  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const isMenuOpen = !!selectedPlayer

  const players = team.players

  const availableStatuses = ['online', 'away', 'teaming']

  const alreadyInvitedByFriend = lobby.invited_players_ids.some(
    (id) => id === selectedPlayer?.user_id
  )

  const alreadyInvited =
    invites.filter(
      (invite) => invite.to_player.user_id === selectedPlayer?.user_id
    ).length > 0 || alreadyInvitedByFriend

  const alreadyOnTeam = lobby.players_ids.includes(selectedPlayer?.user_id)

  const isAvailable =
    !alreadyOnTeam &&
    availableStatuses.includes(selectedPlayer?.status) &&
    !lobby.queue

  const handleRedirectToProfile = () => {
    navigate(`/perfil/${user.id}`)
  }

  const handleOpenMenu = (player) => {
    setSelectedPlayer(player)
  }

  const handleOutsideClick = () => {
    setSelectedPlayer(null)
  }

  useOutsideClick({
    ref: trRef,
    handler: handleOutsideClick,
  })

  return (
    <TableContainer className={style.tableContainer}>
      <Table bgColor="gray.900">
        <Thead>
          <Tr>
            {isSameScore ? (
              <Th className={style.team}>Time {team.name}</Th>
            ) : (
              <Th
                className={[
                  style.team,
                  isWinning ? style.winner : style.loser,
                ].join(' ')}
              >
                Time {team.name}
              </Th>
            )}
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
            <Tooltip label="Dano por round" aria-label="Dano por round tooltip">
              <Th>ADR</Th>
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
          </Tr>
        </Thead>
        <Tbody>
          {players.map((player) => (
            <Tr
              key={player.id}
              className={player.user_id === user.id ? style.highlight : ''}
              onClick={() =>
                player.user_id === user.id
                  ? handleRedirectToProfile()
                  : handleOpenMenu(player)
              }
              cursor="pointer"
              _hover={{
                bgColor: 'rgba(104, 71, 255, 0.15)',
              }}
              ref={trRef}
              data-testid="row"
            >
              <Td className={style.user}>
                <Container align="center" gap={isLessThan2xl ? 18 : 20}>
                  <Container className={style.avatar} fitContent>
                    <Avatar
                      width={{ base: '40px', md: '38px', '2xl': '40px' }}
                      height={{ base: '40px', md: '38px', '2xl': '40px' }}
                      src={player.avatar?.medium}
                      variant="purple"
                    />
                  </Container>

                  <Container className={style.username} column fitContent>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: '16px', md: '14px', '2xl': '16px' }}
                    >
                      {player.username}
                    </Text>
                  </Container>

                  <UserMenuOptions
                    open={
                      isMenuOpen && player.username === selectedPlayer.username
                    }
                    user={user}
                    user_id={player.user_id}
                    isAvailable={isAvailable}
                    alreadyInvited={alreadyInvited}
                    alreadyOnTeam={alreadyOnTeam}
                    username={player.username}
                    steam_url={player.steam_url || ''}
                    placement="right-start"
                    hideBtn={true}
                  />
                </Container>
              </Td>
              <Td>{player.stats.kills}</Td>
              <Td>{player.stats.deaths}</Td>
              <Td>{player.stats.assists}</Td>
              <Td>{player.stats.head_shots}</Td>
              <Td>{Math.ceil(player.stats.head_accuracy || 0)}%</Td>
              <Td>{player.stats.plants}</Td>
              <Td>{player.stats.defuses}</Td>
              <Td>{player.stats.firstkills}</Td>
              <Td>{player.stats.kdr || 0}</Td>
              <Td>{player.stats.adr || 0}</Td>
              <Td>{player.stats.double_kills}</Td>
              <Td>{player.stats.triple_kills}</Td>
              <Td>{player.stats.quadra_kills}</Td>
              <Td>{player.stats.aces}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
