import { Button, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { HomeIcon, Timer } from '@components'
import { formatSecondsToMinutes } from '@utils'

export default function SidebarLobbyButton({ lobby, match_id, userId }) {
  const isInQueue = lobby.queue && !match_id && !lobby.restriction_countdown

  const isRestricted = lobby.restriction_countdown && !match_id

  const isOnLobby = !lobby.queue && !match_id && !lobby.restriction_countdown

  const getBtnVariant = () => {
    if (match_id) return 'queue'

    if (isOnLobby) return ''

    if (isInQueue) return 'queue'

    if (isRestricted) return 'restricted'
  }

  const getButtonLabel = () => {
    if (match_id) return 'Em partida'

    if (isOnLobby) return 'Lobby'

    if (isInQueue) return 'Na fila'

    if (isRestricted) return 'Restrito'
  }

  return (
    <Button
      as={ReactRouterLink}
      to={match_id ? `perfil/${userId}/partidas/${match_id}` : '/jogar'}
      leftIcon={
        <HomeIcon
          style={{ width: '16px', height: '16px', marginRight: '6px' }}
        />
      }
      justifyContent="flex-start"
      px={{ base: '14px', md: '12px', '2xl': '14px' }}
      w="full"
      fontWeight="semiBold"
      textTransform="capitalize"
      height="40px"
      minH="40px"
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
