import { Button, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { HomeIcon, Timer } from '@components'
import { formatSecondsToMinutes } from '@utils'

export default function SidebarLobbyButton({ lobby, match }) {
  const isOnLobby = !lobby.queue && !match && !lobby.restriction_countdown

  const isInQueue = lobby.queue && !match && !lobby.restriction_countdown

  const isRestricted = lobby.restriction_countdown && !match

  const getBtnVariant = () => {
    if (match) return 'queue'

    if (isOnLobby) return ''

    if (isInQueue) return 'queue'

    if (isRestricted) return 'restricted'
  }

  const getButtonLabel = () => {
    if (match) return 'Em partida'

    if (isOnLobby) return 'Lobby'

    if (isInQueue) return 'Na fila'

    if (isRestricted) return 'Restrito'
  }

  return (
    <Button
      as={ReactRouterLink}
      to={match ? `partidas/${match.id}` : '/jogar'}
      leftIcon={<HomeIcon />}
      justifyContent="flex-start"
      px="14px"
      w="full"
      fontWeight="semiBold"
      textTransform="capitalize"
      height={{ base: '42px', md: '32px', '2xl': '42px' }}
      fontSize={14}
      variant={getBtnVariant()}
    >
      {getButtonLabel()}

      {(isInQueue || isRestricted) && (
        <Text
          w="full"
          display="flex"
          justifyContent="flex-end"
          top="1px"
          position="relative"
        >
          {isInQueue && formatSecondsToMinutes(lobby.queue_time)}

          {isRestricted && (
            <Timer initialTime={lobby.restriction_countdown} reverse />
          )}
        </Text>
      )}
    </Button>
  )
}
