'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { revalidatePath } from '@/utils'

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
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const auth = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  const initializeSlices = useCallback(async () => {
    if (!auth?.token) {
      revalidatePath({ path: '/' })
      router.push('/')
      return
    }

    // users
    const userResponse = await httpService.get('accounts/auth/', auth.token, {
      cache: 'no-cache',
    })

    if (userResponse.errorMsg) {
      showErrorToast(userResponse.errorMsg)
      setIsLoading(false)
      revalidatePath({ path: '/' })
      router.push('/')
      return
    }

    useUserStore.getState().updateUser(userResponse)

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

      useLobbyStore.getState().updateLobby(lobbyResponse)

      // friends
      const friendsResponse = await friendsApi.list(auth.token, {
        cache: 'no-cache',
      })

      if (friendsResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      useFriendsStore.getState().initFriends(friendsResponse)

      // invites
      const invitesResponse = await lobbyApi.listInvites(auth.token, {
        cache: 'no-cache',
      })

      if (invitesResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      useInvitesStore.getState().initInvites(invitesResponse)

      // notifications
      const notificationsResponse = await notificationsApi.list(auth.token, {
        cache: 'no-cache',
      })

      if (notificationsResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      useNotificationStore.getState().initNotifications(notificationsResponse)

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

        useMatchStore.getState().updateMatch(matchResponse)
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

        usePreMatchStore.getState().updatePreMatch(preMatchResponse)
      }
    }

    revalidatePath({ path: '/' })
    setIsLoading(false)
  }, [auth?.token, router, showErrorToast])

  return { isLoading, initializeSlices }
}
