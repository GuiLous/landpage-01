'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { httpService } from '@/services'

import { useFriendsStore } from '@/store/friendStore'
import { useInvitesStore } from '@/store/invitesStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { useMatchStore } from '@/store/matchStore'
import { useNotificationStore } from '@/store/notificationStore'
import { usePreMatchStore } from '@/store/preMatchStore'
import { useUserStore } from '@/store/userStore'

import {
  friendsApi,
  lobbyApi,
  matchesApi,
  notificationsApi,
  preMatchApi,
} from '@/modelsApi'

import { useAuth } from './useAuth'
import { useShowErrorToast } from './useShowErrorToast'

export function useInitializeSlices() {
  const { updateUser } = useUserStore()
  const { updateLobby } = useLobbyStore()
  const { initFriends } = useFriendsStore()
  const { initInvites } = useInvitesStore()
  const { initNotifications } = useNotificationStore()
  const { updateMatch } = useMatchStore()
  const { updatePreMatch } = usePreMatchStore()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const auth = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  const initializeSlices = useCallback(async () => {
    if (!auth?.token) {
      router.push('/')
      return
    }

    // users
    const userResponse = await httpService.get('accounts/auth/', auth.token, {
      cache: 'no-cache',
    })

    if (userResponse.errorMsg || userResponse.detail) {
      if (userResponse.errorMsg) showErrorToast(userResponse.errorMsg)
      if (userResponse.detail) showErrorToast(userResponse.detail)
      setIsLoading(false)
      Cookies.remove('token')
      router.push('/')
      return
    }

    updateUser(userResponse)

    if (
      userResponse.is_active &&
      userResponse.account !== null &&
      userResponse.account.is_verified &&
      userResponse.lobby_id !== null
    ) {
      // lobby
      const lobbyResponse = await lobbyApi.detail(
        auth.token,
        userResponse.lobby_id,
        {
          cache: 'no-cache',
        }
      )

      if (lobbyResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      updateLobby(lobbyResponse)

      // friends
      const friendsResponse = await friendsApi.list(auth.token, {
        cache: 'no-cache',
      })

      if (friendsResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      initFriends(friendsResponse)

      // invites
      const invitesResponse = await lobbyApi.listInvites(auth.token, {
        cache: 'no-cache',
      })

      if (invitesResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      initInvites(invitesResponse)

      // notifications
      const notificationsResponse = await notificationsApi.list(auth.token, {
        cache: 'no-cache',
      })

      if (notificationsResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      initNotifications(notificationsResponse)

      // match
      if (userResponse.match_id) {
        const matchResponse = await matchesApi.detail(
          auth.token,
          userResponse.match_id,
          {
            cache: 'no-cache',
          }
        )

        if (matchResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        updateMatch(matchResponse)
      }

      // preMatch
      if (userResponse.pre_match_id) {
        const preMatchResponse = await preMatchApi.detail(auth.token, {
          cache: 'no-cache',
        })

        if (preMatchResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        updatePreMatch(preMatchResponse)
      }
    }

    setIsLoading(false)
  }, [
    auth?.token,
    initFriends,
    initInvites,
    initNotifications,
    router,
    showErrorToast,
    updateLobby,
    updateMatch,
    updatePreMatch,
    updateUser,
  ])

  return { isLoading, initializeSlices }
}
