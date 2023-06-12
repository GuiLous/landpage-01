import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'

import { REACT_APP_WS_URL } from '@config'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
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

import { addNotification } from '@slices/NotificationSlice'

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
        dispatch(
          addToast({
            title: 'Novo convite recebido!',
            content: `Você recebeu um convite de ${data.payload.from_player.username}.`,
          })
        )
        break

      case 'ws_refuseInvite':
        dispatch(
          addToast({
            title: 'Convite recusado',
            content: `O convite para ${data.payload.to_player.username} foi recusado.`,
          })
        )
        dispatch(removeInvite(data.payload))
        break

      case 'ws_updateInvite':
        dispatch(updateInviteReceived(data.payload))
        break

      case 'ws_removeInvite':
        if (data.payload.to_player.id === user.id) {
          dispatch(
            addToast({
              title: 'Convite expirado',
              content: `O convite de ${data.payload.from_player.username} expirou.`,
            })
          )
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
        dispatch(
          addToast({
            content:
              'Seu grupo não aceitou a pré verificação. A partida foi cancelada e seu grupo foi removido da fila.',
            variant: 'warning',
          })
        )
        break

      case 'ws_restartQueue':
        dispatch(restartQueue())
        break

      case 'ws_match':
        dispatch(match(data.payload))
        break

      case 'ws_newNotification':
        dispatch(addNotification(data.payload))
        break

      default:
        break
    }
  }
}
