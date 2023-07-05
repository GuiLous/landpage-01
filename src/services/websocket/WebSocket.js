import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useWebSocket from 'react-use-websocket'

import { REACT_APP_WS_URL } from '@config'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { addFriend, updateFriend } from '@slices/FriendSlice'
import { addInvite, deleteInvite } from '@slices/InviteSlice'
import { updateLobby, updateQueueTime } from '@slices/LobbySlice'
import { updateMaintenance } from '@slices/MaintenanceSlice'
import { updateMatch } from '@slices/MatchSlice'
import { addNotification } from '@slices/NotificationSlice'
import { updatePreMatch } from '@slices/PreMatchSlice'
import { updateUser } from '@slices/UserSlice'

export const WSS = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const token = StorageService.get('token')

  const showInviteRefusedToast = (payload) => {
    const invite = payload.invite
    const refused = payload.status === 'refused'

    if (refused && invite.to_player.user_id !== user.id) {
      dispatch(
        addToast({
          content: `${invite.to_player.username} recusou seu convite.`,
        })
      )
    }
  }

  const showInviteExpiredToast = (payload) => {
    const invite = payload
    const was_sent = invite.from_player.user_id === user.id
    const content = `O convite ${
      was_sent
        ? 'para ' + invite.to_player.username
        : 'de ' + invite.from_player.username
    } expirou.`

    dispatch(
      addToast({
        content: content,
      })
    )
  }

  const logout = async () => {
    StorageService.remove('token')
    window.location.href = '/'
  }

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
      // ==== New Websockets ==== //

      // User
      case 'user/logout':
        logout()
        break

      case 'user/update':
        dispatch(updateUser(data.payload))
        break

      // Invites
      case 'invites/create':
        dispatch(
          addToast({
            variant: 'invite',
            title: data.payload.from_player.username,
            content: 'Convidou você para um grupo.',
            avatar: data.payload.from_player.avatar.small,
            invite_id: data.payload.id,
          })
        )
        dispatch(addInvite(data.payload))
        break

      case 'invites/delete':
        dispatch(deleteInvite(data.payload.invite))
        showInviteRefusedToast(data.payload)
        break

      case 'invites/expire':
        dispatch(deleteInvite(data.payload))
        showInviteExpiredToast(data.payload)
        break

      // Friends
      case 'friends/update':
        dispatch(updateFriend(data.payload))
        break

      case 'friends/create':
        dispatch(addFriend(data.payload))
        break

      // Lobbies
      case 'lobbies/player_join':
        dispatch(updateLobby(data.payload.lobby))
        dispatch(
          addToast({
            content: `${data.payload.player.username} entrou para o seu grupo.`,
          })
        )
        break

      case 'lobbies/player_leave':
        dispatch(updateLobby(data.payload.lobby))
        dispatch(
          addToast({
            content: `${data.payload.player.username} deixou o seu grupo.`,
          })
        )
        break

      case 'lobbies/update':
        dispatch(updateLobby(data.payload))
        break

      case 'lobbies/queue_tick':
        dispatch(updateQueueTime(data.payload))
        break

      // Notifications
      case 'notifications/add':
        dispatch(addNotification(data.payload))
        break

      // PreMatches
      case 'pre_matches/create':
      case 'pre_matches/update':
      case 'pre_matches/delete':
        dispatch(updatePreMatch(data.payload))
        break

      // Matches
      case 'matches/create':
        dispatch(updateMatch(data.payload))
        navigate(`/partidas/${data.payload.id}/conectar/`)
        break

      // Toasts
      case `toasts/create`:
        dispatch(
          addToast({
            content: data.payload.content,
            variant: data.payload.variant,
          })
        )
        break

      // Maintenance
      case 'maintenance/start':
        StorageService.set('maintenance', true)
        dispatch(updateMaintenance(true))
        navigate('/manutencao')
        break

      case 'maintenance/end':
        navigate(0)
        break

      default:
        break
    }
  }
}
