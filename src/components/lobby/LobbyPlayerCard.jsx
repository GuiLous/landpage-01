import { Avatar, Divider, Icon, Link, Text } from '@chakra-ui/react'
import { SiSteam } from 'react-icons/si'
import { Link as ReactRouterLink } from 'react-router-dom'

import { CloseIcon, Container, LevelBadge, UserIcon } from '@components'
import { useLatestMatchesResults } from '@hooks'

import style from './LobbyPlayerCard.module.css'

export default function LobbyPlayerCard({ player, onClose, closeLabel }) {
  const latestMatchesResults = useLatestMatchesResults(
    player.latest_matches_results.filter((val) => val !== 'N/A'),
    false
  )

  const renderLatestMatchesResults = () => {
    const noMatches = player.latest_matches_results.every(
      (val, i, arr) => val === 'N/A'
    )
    if (noMatches) return 'N/A'
    else return latestMatchesResults
  }

  return (
    <Container className={style.container} column justify="between">
      {onClose && (
        <Container
          className={style.closeButton}
          align="center"
          gap={10}
          onClick={onClose}
        >
          <Icon as={CloseIcon} fontSize={14} color="white" />
          <Text textTransform="uppercase">{closeLabel}</Text>
        </Container>
      )}

      <Container column align="center" gap={18} fitContent>
        <Avatar src={player.avatar.large} size="xxl" variant="white" />
        <Text fontSize={18} fontWeight="semibold" textTransform="uppercase">
          {player.username}
        </Text>
      </Container>

      <Container column align="center" fitContent gap={8}>
        <Container justify="center">
          <Text textTransform="uppercase" fontSize={12} fontWeight="medium">
            Últimas partidas
          </Text>
        </Container>

        <Container justify="center" className={style.latestResults}>
          {renderLatestMatchesResults()}
        </Container>

        <Divider borderColor="whiteAlpha.400" maxW="70%" />

        <Container justify="center">
          <Text textTransform="uppercase" fontSize={12} fontWeight="medium">
            {player.matches_played} Partidas jogadas
          </Text>
        </Container>
      </Container>

      <Container justify="center" fitContent>
        <LevelBadge level={player.level} />
      </Container>

      <Container justify="center" fitContent gap={32}>
        <Container fitContent className={style.footerButton}>
          <Link
            as={ReactRouterLink}
            to={`/perfil/${player.user_id}`}
            color="white"
          >
            <Icon as={UserIcon} fontSize={24} />
          </Link>
        </Container>

        <Container fitContent className={style.footerButton}>
          <Link href={player.steam_url} isExternal color="white">
            <Icon as={SiSteam} fontSize={24} />
          </Link>
        </Container>
      </Container>
    </Container>
  )
}
