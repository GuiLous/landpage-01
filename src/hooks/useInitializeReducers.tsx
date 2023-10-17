import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { httpService, storageService } from '@/services'

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

import { useShowErrorToast } from './useShowErrorToast'

export function useInitializeReducers() {
  const dispatch = useAppDispatch()
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const initializeReducers = useCallback(
    async (userToken: string | null) => {
      if (!userToken) {
        router.push('/')
        return
      }

      setIsLoading(true)

      // users
      const userResponse = await httpService.get('accounts/auth/', userToken)

      if (userResponse.errorMsg) {
        showErrorToast(userResponse.errorMsg)
        router.push('/')
        setIsLoading(false)
        return
      }

      storageService.set('token', userToken)
      dispatch(updateUser(userResponse))

      if (
        userResponse.is_active &&
        userResponse.account !== null &&
        userResponse.account.is_verified &&
        userResponse.lobby_id !== null
      ) {
        // lobby
        const lobbyResponse = await lobbyApi.detail(
          userToken,
          userResponse.lobby_id
        )

        if (lobbyResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        dispatch(updateLobby(lobbyResponse))

        // friends
        const friendsResponse = await friendsApi.list(userToken)

        if (friendsResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        dispatch(initFriends(friendsResponse))

        // invites
        const invitesResponse = await lobbyApi.listInvites(userToken)

        if (invitesResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        dispatch(initInvites(invitesResponse))

        // notifications
        const notificationsResponse = await notificationsApi.list(userToken)

        if (notificationsResponse.errorMsg) {
          showErrorToast(userResponse.errorMsg)
          setIsLoading(false)
          return
        }

        dispatch(initNotifications(notificationsResponse))

        // match
        if (userResponse.match_id) {
          const matchResponse = await matchesApi.detail(
            userToken,
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
          const preMatchResponse = await preMatchApi.detail(userToken)

          if (preMatchResponse.errorMsg) {
            showErrorToast(userResponse.errorMsg)
            setIsLoading(false)
            return
          }

          dispatch(updatePreMatch(preMatchResponse))
        }
      }

      setIsLoading(false)
    },
    [dispatch, showErrorToast, router]
  )

  return { isLoading, initializeReducers }
}
