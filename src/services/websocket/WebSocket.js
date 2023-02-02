import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'

import { REACT_APP_WS_URL } from '@config'
import { StorageService } from '@services'
import {
  addFriend,
  addInviteReceived,
  removeInvite,
  updateFriend,
  updateInviteReceived,
  updateLobby,
  updateUser,
} from '@slices/UserSlice'

export const WSS = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const token = StorageService.get('token')
  const toast = useToast()

  useWebSocket(
    REACT_APP_WS_URL,
    {
      onMessage: (event) => handleMessageReceived(event),
      share: true,
      shouldReconnect: (closeEvent) => false,
      queryParams: { token: token },
    },
    token && user && user.account && user.account.is_verified
  )

  const handleMessageReceived = (event) => {
    const data = JSON.parse(event.data)

    switch (data.meta.action) {
      case 'ws_userUpdate':
        dispatch(updateUser(data.payload))
        break

      case 'ws_userStatusChange':
        dispatch(updateFriend(data.payload))
        break

      case 'ws_friendlistAdd':
        dispatch(addFriend(data.payload))
        break

      case 'ws_lobbyUpdate':
        dispatch(updateLobby(data.payload))
        break

      case 'ws_lobbyInviteReceived':
        dispatch(addInviteReceived(data.payload))
        break

      case 'ws_refuseInvite':
        toast({
          title: 'Convite recusado',
          description: `O convite para ${data.payload.to_player.username} foi recusado.`,
          status: 'info',
          isClosable: true,
          position: 'bottom-right',
          duration: 60000,
          variant: 'subtle',
        })
        dispatch(removeInvite(data.payload))
        break

      case 'ws_updateInvite':
        dispatch(updateInviteReceived(data.payload))
        break

      case 'ws_removeInvite':
        if (data.payload.to_player.id === user.id) {
          toast({
            title: 'Convite expirou',
            description: `O convite de ${data.payload.from_player.username} expirou.`,
            status: 'info',
            isClosable: true,
            position: 'bottom-right',
            duration: 60000,
            variant: 'subtle',
          })
        }
        dispatch(removeInvite(data.payload))
        break

      default:
        break
    }
  }
}
