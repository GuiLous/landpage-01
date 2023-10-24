import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { httpService } from '@/services'

import { useAppDispatch } from '@/store'
import { initFriends } from '@/store/slices/friendSlice'
import { initInvites } from '@/store/slices/inviteSlice'
import { updateLobby } from '@/store/slices/lobbySlice'
import { updateMatch } from '@/store/slices/matchSlice'
import { initNotifications } from '@/store/slices/notificationSlice'
import { updatePreMatch } from '@/store/slices/preMatchSlice'
import { updateUser } from '@/store/slices/userSlice'

import {
  friendsApi,
  lobbyApi,
  matchesApi,
  notificationsApi,
  preMatchApi,
} from '@/api'

import { useAuth } from './useAuth'
import { useShowErrorToast } from './useShowErrorToast'

export function useInitializeSlices() {
  const dispatch = useAppDispatch()
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const getAuth = useAuth()
  const auth = getAuth()

  const [isLoading, setIsLoading] = useState(true)

  const initializeSlices = useCallback(async () => {
    if (!auth?.token) {
      router.push('/')
      return
    }

    // users
    const userResponse = await httpService.get('accounts/auth/', auth.token)

    if (userResponse.errorMsg) {
      showErrorToast(userResponse.errorMsg)
      router.push('/')
      setIsLoading(false)
      return
    }

    dispatch(updateUser(userResponse))

    if (
      userResponse.is_active &&
      userResponse.account !== null &&
      userResponse.account.is_verified &&
      userResponse.lobby_id !== null
    ) {
      // lobby
      const lobbyResponse = await lobbyApi.detail(
        auth.token,
        userResponse.lobby_id
      )

      if (lobbyResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      dispatch(updateLobby(lobbyResponse))

      // friends
      const friendsResponse = await friendsApi.list(auth.token)

      if (friendsResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      dispatch(initFriends(friendsResponse))

      // invites
      const invitesResponse = await lobbyApi.listInvites(auth.token)

      if (invitesResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      dispatch(initInvites(invitesResponse))

      // notifications
      const notificationsResponse = await notificationsApi.list(auth.token)

      if (notificationsResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        setIsLoading(false)
        return
      }

      dispatch(initNotifications(notificationsResponse))

      // match
      if (userResponse.match_id) {
        const matchResponse = await matchesApi.detail(
          auth.token,
          userResponse.match_id
        )

        if (matchResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        dispatch(updateMatch(matchResponse))
      }

      // preMatch
      if (userResponse.pre_match_id) {
        const preMatchResponse = await preMatchApi.detail(auth.token)

        if (preMatchResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        dispatch(updatePreMatch(preMatchResponse))
      }
    }

    setIsLoading(false)
  }, [auth?.token, dispatch, router, showErrorToast])

  return { isLoading, initializeSlices }
}
