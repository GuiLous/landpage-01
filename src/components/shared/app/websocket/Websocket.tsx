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
  const user = useUserStore.getState().user

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
        useAppStore.getState().addToast({
          content: `${invite.to_player.username} recusou seu convite.`,
        })
      }
    },
    [user]
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

      useAppStore.getState().addToast({
        content,
      })
    },
    [user]
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
          useUserStore.getState().updateUser(data.payload)
          break

        // Invites
        case 'invites/create':
          useAppStore.getState().addToast({
            variant: 'invite',
            title: data.payload.from_player.username,
            content: 'Convidou você para um grupo.',
            avatar: data.payload.from_player.avatar.small,
            invite_id: data.payload.id,
          })

          useInvitesStore.getState().addInvite(data.payload)
          break

        case 'invites/delete':
          useInvitesStore.getState().deleteInvite(data.payload.invite.id)
          showInviteRefusedToast(data.payload)
          revalidatePath({ path: '/' })
          break

        case 'invites/expire':
          useInvitesStore.getState().deleteInvite(data.payload.invite)
          showInviteExpiredToast(data.payload)
          break

        // Friends
        case 'friends/create':
          useFriendsStore.getState().removeFriendRequest(data.payload.user_id)
          useFriendsStore.getState().addFriend(data.payload)
          break

        case 'friends/delete':
          useFriendsStore
            .getState()
            .removeFriend(data.payload.status, data.payload.user_id)
          break

        case 'friends/update':
          useFriendsStore.getState().updateFriend(data.payload)
          break

        case 'friends/request':
          useFriendsStore.getState().addFriendRequest(data.payload)
          break

        case 'friends/request/refuse':
          useFriendsStore.getState().removeFriendSentRequest(data.payload.to_id)
          break

        // Lobbies
        case 'lobbies/player_join':
          useLobbyStore.getState().updateLobby(data.payload.lobby)
          useAppStore.getState().addToast({
            content: `${data.payload.player.username} entrou para o seu grupo.`,
          })
          break

        case 'lobbies/player_leave':
          useLobbyStore.getState().updateLobby(data.payload.lobby)
          useAppStore.getState().addToast({
            content: `${data.payload.player.username} deixou o seu grupo.`,
          })
          break

        case 'lobbies/update':
          useLobbyStore.getState().updateLobby(data.payload)
          break

        case 'lobbies/queue_tick':
          useLobbyStore.getState().updateQueueTime(data.payload)
          break

        case 'lobbies/queue_start':
          start_queue()
          break

        // Notifications
        case 'notifications/add':
          useNotificationStore.getState().addNotification(data.payload)
          useAppStore.getState().addToast({
            variant: 'notification',
            title: 'Nova notificação',
            content: data.payload.content,
            avatar: data.payload.avatar,
          })
          break

        // PreMatches
        case 'pre_matches/update':
        case 'pre_matches/delete':
          usePreMatchStore.getState().updatePreMatch(data.payload)
          break

        case 'pre_matches/create':
          usePreMatchStore.getState().updatePreMatch(data.payload)
          revalidatePath({ path: '/jogar' })
          router.push('/jogar')
          break

        // Matches
        case 'matches/create':
          useMatchStore.getState().updateMatch(data.payload)
          revalidatePath({ path: `/partidas/${data.payload.id}/conectar` })
          router.push(`/partidas/${data.payload.id}/conectar`)
          break

        case 'matches/update':
          useMatchStore.getState().updateMatch(data.payload)
          break

        case 'matches/delete':
          useMatchStore.getState().cancelMatch()
          useAppStore.getState().addToast({
            variant: 'warning',
            title: 'Partida cancelada',
            content:
              'Todos os jogadores não se conectaram a tempo ou algum fator desconhecido aconteceu e a sua partida foi cancelada.',
          })
          break

        // Toasts
        case `toasts/create`:
          useAppStore.getState().addToast({
            content: data.payload.content,
            variant: data.payload.variant,
          })
          break

        // Maintenance
        case 'maintenance/start':
          useAppStore.getState().updateMaintenance(true)
          revalidatePath({ path: '/manutencao' })
          router.push('/manutencao')
          break

        case 'maintenance/end':
          useAppStore.getState().updateMaintenance(false)
          revalidatePath({ path: '/jogar' })
          router.push('/jogar')
          break

        default:
          break
      }

      if (data.meta.action !== 'keep_alive/ping') {
        revalidatePath({ path: '/' })
      }
    },
    [
      logout,
      router,
      start_queue,
      showInviteExpiredToast,
      showInviteRefusedToast,
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
