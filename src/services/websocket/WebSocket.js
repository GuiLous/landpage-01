import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'

import { REACT_APP_WS_URL } from '@config'
import { StorageService, Toast } from '@services'
import { newInvite } from '@slices/InviteSlice'
import {
  addFriend,
  addInviteReceived,
  removeInvite,
  restartQueue,
  updateFriend,
  updateInviteReceived,
  updateLobby,
  updateUser,
} from '@slices/UserSlice'

import { match, preMatch } from '@slices/MatchSlice'

export const WSS = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const token = StorageService.get('token')

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
        dispatch(newInvite())
        Toast({
          title: 'Convite recebido',
          description: `Você recebeu um convite de ${data.payload.from_player.username}.`,
          status: 'success',
        })
        break

      case 'ws_refuseInvite':
        Toast({
          title: 'Convite recusado',
          description: `O convite para ${data.payload.to_player.username} foi recusado.`,
          status: 'info',
        })
        dispatch(removeInvite(data.payload))
        break

      case 'ws_updateInvite':
        dispatch(updateInviteReceived(data.payload))
        break

      case 'ws_removeInvite':
        if (data.payload.to_player.id === user.id) {
          Toast({
            title: 'Convite expirou',
            description: `O convite de ${data.payload.from_player.username} expirou.`,
            status: 'info',
          })
        }
        dispatch(removeInvite(data.payload))
        break

      case 'ws_preMatch':
        dispatch(preMatch(data.payload))
        break

      case 'ws_preMatchCancel':
        dispatch(preMatch(null))
        break

      case 'ws_preMatchCancelWarn':
        Toast({
          title: 'Não aceitou a partida',
          description:
            'Um ou mais jogadores desse lobby não aceitaram a partida. Na próxima vez que isso acontecer, os jogadores que não aceitarem podem sofrer penalidades.',
          status: 'warning',
        })
        break

      case 'ws_restartQueue':
        dispatch(restartQueue())
        break

      case 'ws_match':
        dispatch(match(data.payload))
        break

      default:
        break
    }
  }
}
