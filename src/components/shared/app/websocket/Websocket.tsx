import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import useWebSocket from 'react-use-websocket'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { addToast, updateMaintenance } from '@/store/slices/appSlice'
import { addFriend, updateFriend } from '@/store/slices/friendSlice'
import { addInvite, deleteInvite } from '@/store/slices/inviteSlice'
import { updateLobby, updateQueueTime } from '@/store/slices/lobbySlice'
import { cancelMatch, updateMatch } from '@/store/slices/matchSlice'
import { addNotification } from '@/store/slices/notificationSlice'
import { updatePreMatch } from '@/store/slices/preMatchSlice'
import { updateUser } from '@/store/slices/userSlice'

import { lobbyApi } from '@/api'

import { useAuth, useShowErrorToast } from '@/hooks'

export function Websocket() {
  const { user } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const showErrorToast = useShowErrorToast()

  const getAuth = useAuth()
  const auth = getAuth()

  const router = useRouter()

  useWebSocket(
    process.env.NEXT_PUBLIC_REACT_APP_WS_URL || '',
    {
      onMessage: (event) => handleMessageReceived(event),
      share: true,
      shouldReconnect: () => false,
      queryParams: auth?.token ? { token: auth.token } : {},
    },
    !!auth?.token && !!user && user.account && user.account.is_verified
  )

  const showInviteRefusedToast = useCallback(
    (payload: any) => {
      const invite = payload.invite
      const refused = payload.status === 'refused'

      if (refused && invite.to_player.user_id !== user?.id) {
        dispatch(
          addToast({
            content: `${invite.to_player.username} recusou seu convite.`,
          })
        )
      }
    },
    [dispatch, user]
  )

  const showInviteExpiredToast = useCallback(
    (payload: any) => {
      const invite = payload
      const was_sent = invite.from_player.user_id === user?.id
      const content = `O convite ${
        was_sent
          ? 'para ' + invite.to_player.username
          : 'de ' + invite.from_player.username
      } expirou.`

      dispatch(
        addToast({
          content,
        })
      )
    },
    [dispatch, user]
  )

  const logout = useCallback(async () => {
    Cookies.remove('token')
    router.push('/')
  }, [router])

  const start_queue = useCallback(async () => {
    if (!auth?.token || !user?.lobby_id) return

    const response = await lobbyApi.startQueue(auth.token, user.lobby_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [showErrorToast, auth, user])

  const handleMessageReceived = useCallback(
    (event: any) => {
      const data = JSON.parse(event.data)

      switch (data.meta.action) {
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

        case 'lobbies/queue_start':
          start_queue()
          break

        // Notifications
        case 'notifications/add':
          dispatch(addNotification(data.payload))
          dispatch(
            addToast({
              variant: 'notification',
              title: 'Nova notificação',
              content: data.payload.content,
              avatar: data.payload.avatar,
            })
          )
          break

        // PreMatches
        case 'pre_matches/update':
        case 'pre_matches/delete':
          dispatch(updatePreMatch(data.payload))
          break

        case 'pre_matches/create':
          dispatch(updatePreMatch(data.payload))
          if (data.payload.state === 'pre_start') router.push('/jogar')
          break

        // Matches
        case 'matches/create':
          dispatch(updateMatch(data.payload))
          router.push(`/partidas/${data.payload.id}/conectar`)
          break

        case 'matches/update':
          dispatch(updateMatch(data.payload))
          break

        case 'matches/delete':
          dispatch(cancelMatch())
          dispatch(
            addToast({
              variant: 'warning',
              title: 'Partida cancelada',
              content:
                'Todos os jogadores não se conectaram a tempo ou algum fator desconhecido aconteceu e a sua partida foi cancelada.',
            })
          )
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
          storageService.set('maintenance', true)
          dispatch(updateMaintenance(true))
          router.push('/manutencao')
          break

        case 'maintenance/end':
          router.refresh()
          break

        default:
          break
      }
    },
    [
      dispatch,
      logout,
      router,
      start_queue,
      showInviteExpiredToast,
      showInviteRefusedToast,
    ]
  )

  return null
}
