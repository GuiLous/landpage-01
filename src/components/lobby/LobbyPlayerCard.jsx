import {
  Avatar,
  Divider,
  Icon,
  Link,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { SiSteam } from 'react-icons/si'
import { Link as ReactRouterLink } from 'react-router-dom'

import { CloseIcon, Container, LevelBadge, UserIcon } from '@components'
import { useLatestMatchesResults } from '@hooks'

import style from './LobbyPlayerCard.module.css'

export default function LobbyPlayerCard({ player, onClose, closeLabel }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const latestMatchesResults = useLatestMatchesResults(
    player.latest_matches_results.filter((val) => val !== 'N/A'),
    false
  )

  const renderLatestMatchesResults = () => {
    const noMatches = player.latest_matches_results.every(
      (val) => val === 'N/A'
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
          gap={isLessThan2xl ? 8 : 10}
          onClick={onClose}
        >
          <Icon
            as={CloseIcon}
            fontSize={{ base: 14, md: 12, '2xl': 14 }}
            color="white"
          />
          <Text
            textTransform="uppercase"
            fontSize={{ base: 16, md: 14, '2xl': 16 }}
          >
            {closeLabel}
          </Text>
        </Container>
      )}

      <Container column align="center" gap={18} fitContent>
        <Avatar
          src={player.avatar.large}
          size={{ base: 'xxl', md: 'xl', '2xl': 'xxl' }}
          variant="white"
        />
        <Text
          fontSize={{ base: 18, md: 16, '2xl': 18 }}
          fontWeight="semibold"
          textTransform="uppercase"
        >
          {player.username}
        </Text>
      </Container>

      <Container column align="center" fitContent gap={8}>
        <Container justify="center">
          <Text
            textTransform="uppercase"
            fontSize={{ base: 12, md: 10, '2xl': 12 }}
            fontWeight="medium"
          >
            Últimas partidas
          </Text>
        </Container>

        <Container justify="center" className={style.latestResults}>
          {renderLatestMatchesResults()}
        </Container>

        <Divider borderColor="whiteAlpha.400" maxW="70%" />

        <Container justify="center">
          <Text
            textTransform="uppercase"
            fontSize={{ base: 12, md: 10, '2xl': 12 }}
            fontWeight="medium"
          >
            {player.matches_played} Partidas jogadas
          </Text>
        </Container>
      </Container>

      <Container justify="center" fitContent>
        <LevelBadge level={player.level} size={isLessThan2xl ? 'smd' : 'md'} />
      </Container>

      <Container justify="center" fitContent gap={isLessThan2xl ? 22 : 32}>
        <Container fitContent className={style.footerButton}>
          <Link
            as={ReactRouterLink}
            to={`/perfil/${player.user_id}`}
            color="white"
          >
            <Icon
              as={UserIcon}
              fontSize={{ base: 24, md: 18, '2xl': 24 }}
              verticalAlign="middle"
            />
          </Link>
        </Container>

        <Container fitContent className={style.footerButton}>
          <Link href={player.steam_url} isExternal color="white">
            <Icon
              as={SiSteam}
              fontSize={{ base: 24, md: 18, '2xl': 24 }}
              verticalAlign="middle"
            />
          </Link>
        </Container>
      </Container>
    </Container>
  )
}
