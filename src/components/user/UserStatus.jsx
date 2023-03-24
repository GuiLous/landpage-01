import { Text } from '@chakra-ui/react'
import React from 'react'

export default function UserStatus(props) {
  const resolveStatus = () => {
    switch (props.status) {
      case 'online':
        return 'Online'

      case 'offline':
        return 'Offline'

      case 'away':
        return 'Ausente'

      case 'in_game':
        return 'Em partida'

      case 'teaming':
        if (props.teamingTogether) return 'No seu grupo'
        else return 'Em grupo'

      case 'queued':
        return 'Procurando partida'

      default:
        return 'Offline'
    }
  }

  return <Text className={props.className}>{resolveStatus()}</Text>
}
