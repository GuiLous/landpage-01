'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import useWebSocket from 'react-use-websocket'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'
import { useFriendsStore } from '@/store/friendStore'
import { useInvitesStore } from '@/store/invitesStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { useMatchStore } from '@/store/matchStore'
import { useNotificationStore } from '@/store/notificationStore'
import { usePreMatchStore } from '@/store/preMatchStore'
import { useUserStore } from '@/store/userStore'

import { lobbyApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

export function Websocket() {
  const { addToast, updateMaintenance } = useAppStore()
  const { user, updateUser } = useUserStore()
  const { addInvite, deleteInvite } = useInvitesStore()
  const {
    addFriend,
    addFriendRequest,
    removeFriendRequest,
    removeFriendSentRequest,
    updateFriend,
    removeFriend,
  } = useFriendsStore()
  const { updateLobby, updateQueueTime } = useLobbyStore()
  const { addNotification } = useNotificationStore()
  const { updatePreMatch } = usePreMatchStore()
  const { updateMatch, cancelMatch } = useMatchStore()

  const showErrorToast = useShowErrorToast()

  const auth = useAuth()

  const router = useRouter()

  useWebSocket(
    process.env.NEXT_PUBLIC_REACT_APP_WS_URL || '',
    {
      onMessage: (event) => handleMessageReceived(event),
      share: true,
      shouldReconnect: () => true,
      queryParams: auth?.token ? { token: auth.token } : {},
    },
    !!auth?.token && !!user && user.account && user.account.is_verified
  )

  const showInviteRefusedToast = useCallback(
    (payload: any) => {
      const invite = payload.invite
      const refused = payload.status === 'refused'

      if (refused && invite.to_player.user_id !== user?.id) {
        addToast({
          content: `${invite.to_player.username} recusou seu convite.`,
        })
      }
    },
    [addToast, user?.id]
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

      addToast({
        content,
      })
    },
    [addToast, user?.id]
  )

  const logout = useCallback(async () => {
    Cookies.remove('token')
    revalidatePath({ path: '/' })
    return router.push('/')
  }, [router])

  const start_queue = useCallback(async () => {
    if (!auth?.token || !user?.lobby_id) return

    const response = await lobbyApi.startQueue(auth.token, user.lobby_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [showErrorToast, auth?.token, user])

  const handleMessageReceived = useCallback(
    (event: any) => {
      const data = JSON.parse(event.data)

      switch (data.meta.action) {
        // User
        case 'user/logout':
          logout()
          break

        case 'user/update':
          updateUser(data.payload)
          break

        // Invites
        case 'invites/create':
          addToast({
            variant: 'invite',
            title: data.payload.from_player.username,
            content: 'Convidou você para um grupo.',
            avatar: data.payload.from_player.avatar.small,
            invite_id: data.payload.id,
          })

          addInvite(data.payload)
          break

        case 'invites/delete':
          deleteInvite(data.payload.invite.id)
          showInviteRefusedToast(data.payload)
          break

        case 'invites/expire':
          deleteInvite(data.payload.invite)
          showInviteExpiredToast(data.payload)
          break

        // Friends
        case 'friends/create':
          removeFriendRequest(data.payload.user_id)
          addFriend(data.payload)
          break

        case 'friends/delete':
          removeFriend(data.payload.status, data.payload.user_id)
          break

        case 'friends/update':
          updateFriend(data.payload)
          break

        case 'friends/request':
          addFriendRequest(data.payload)
          break

        case 'friends/request/refuse':
          removeFriendSentRequest(data.payload.to_id)
          break

        // Lobbies
        case 'lobbies/player_join':
          updateLobby(data.payload.lobby)
          addToast({
            content: `${data.payload.player.username} entrou para o seu grupo.`,
          })
          break

        case 'lobbies/player_leave':
          updateLobby(data.payload.lobby)
          addToast({
            content: `${data.payload.player.username} deixou o seu grupo.`,
          })
          break

        case 'lobbies/update':
          updateLobby(data.payload)
          break

        case 'lobbies/queue_tick':
          updateQueueTime(data.payload)
          break

        case 'lobbies/queue_start':
          start_queue()
          break

        // Notifications
        case 'notifications/add':
          addNotification(data.payload)
          addToast({
            variant: 'notification',
            title: 'Nova notificação',
            content: data.payload.content,
            avatar: data.payload.avatar,
          })
          break

        // PreMatches
        case 'pre_matches/update':
        case 'pre_matches/delete':
          updatePreMatch(data.payload)
          break

        case 'pre_matches/create':
          updatePreMatch(data.payload)
          router.push('/jogar')
          break

        // Matches
        case 'matches/create':
          updateMatch(data.payload)
          revalidatePath({ path: '/' })
          router.push(`/partidas/${data.payload.id}/conectar`)
          break

        case 'matches/update':
          updateMatch(data.payload)
          revalidatePath({ path: '/' })
          break

        case 'matches/delete':
          cancelMatch()
          addToast({
            variant: 'warning',
            title: 'Partida cancelada',
            content:
              'Todos os jogadores não se conectaram a tempo ou algum fator desconhecido aconteceu e a sua partida foi cancelada.',
          })
          revalidatePath({ path: '/' })
          break

        // Toasts
        case `toasts/create`:
          addToast({
            content: data.payload.content,
            variant: data.payload.variant,
          })
          break

        // Maintenance
        case 'maintenance/start':
          updateMaintenance(true)
          revalidatePath({ path: '/manutencao' })
          router.push('/manutencao')
          break

        case 'maintenance/end':
          updateMaintenance(false)
          revalidatePath({ path: '/jogar' })
          router.push('/jogar')
          break

        default:
          break
      }
    },
    [
      logout,
      updateUser,
      addToast,
      addInvite,
      deleteInvite,
      showInviteRefusedToast,
      showInviteExpiredToast,
      removeFriendRequest,
      addFriend,
      removeFriend,
      updateFriend,
      addFriendRequest,
      removeFriendSentRequest,
      updateLobby,
      updateQueueTime,
      start_queue,
      addNotification,
      updatePreMatch,
      router,
      updateMatch,
      cancelMatch,
      updateMaintenance,
    ]
  )

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     sendJsonMessage({ keep_alive: 'keep_alive' })
  //   }, SEND_KEEP_ALIVE_TIME)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [sendJsonMessage])

  return null
}
