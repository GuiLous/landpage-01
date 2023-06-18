import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FriendsAPI, LobbiesAPI, NotificationsAPI } from '@api'
import { Container, Loading, LoadingBackdrop, ToastList } from '@components'
import { AuthService, StorageService, WSS } from '@services'
import { addToast } from '@slices/AppSlice'
import { initFriends } from '@slices/FriendSlice'
import { initInvites } from '@slices/InviteSlice'
import { updateLobby } from '@slices/LobbySlice'
import { initNotifications } from '@slices/NotificationSlice'
import { updateUser } from '@slices/UserSlice'
import Router from './Router'

export default function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [fetching, setFetching] = useState(true)
  const [apisReady, setApisReady] = useState({
    auth: false,
    lobby: false,
    friends: false,
    invites: false,
    notifications: false,
  })

  const userToken = StorageService.get('token')

  const showErrorToast = (error) =>
    dispatch(
      addToast({
        content: error,
        variant: 'error',
      })
    )

  useEffect(() => {
    if (Object.values(apisReady).every((item) => item === true))
      setFetching(false)
  }, [apisReady])

  // =================== //
  // User authentication //
  // =================== //
  useEffect(() => {
    const authenticate = async (token) => {
      const user = await AuthService.login(token)
      dispatch(updateUser(user))

      if (
        user !== null &&
        user.is_active &&
        user.account !== null &&
        user.account.is_verified &&
        user.lobby_id !== null
      )
        setApisReady({ ...apisReady, auth: true })
      else setFetching(false)
    }

    if (userToken && !user) authenticate(userToken)
    else setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ================ //
  // Initialize lobby //
  // ================ //
  useEffect(() => {
    const initializeLobby = async () => {
      const response = await LobbiesAPI.detail(userToken, user.lobby_id)

      if (response.errorMsg) showErrorToast(response.errorMsg)
      else dispatch(updateLobby(response))

      setApisReady({ ...apisReady, lobby: true })
    }

    if (apisReady.auth) initializeLobby()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apisReady.auth])

  // ================== //
  // Initialize friends //
  // ================== //
  useEffect(() => {
    const initializeFriends = async () => {
      const response = await FriendsAPI.list(userToken)

      if (response.errorMsg) showErrorToast(response.errorMsg)
      else dispatch(initFriends(response))

      setApisReady({ ...apisReady, friends: true })
    }

    if (apisReady.lobby) initializeFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apisReady.lobby])

  // ======================== //
  // Initialize lobby invites //
  // ======================== //
  useEffect(() => {
    const initializeLobbyInvites = async () => {
      const response = await LobbiesAPI.listInvites(userToken)

      if (response.errorMsg) showErrorToast(response.errorMsg)
      else dispatch(initInvites(response))

      setApisReady({ ...apisReady, invites: true })
    }

    if (apisReady.friends) initializeLobbyInvites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apisReady.friends])

  // ======================== //
  // Initialize notifications //
  // ======================== //
  useEffect(() => {
    const initializeNotifications = async () => {
      const response = await NotificationsAPI.list(userToken)

      if (response.errorMsg) showErrorToast(response.errorMsg)
      else dispatch(initNotifications(response))

      setApisReady({ ...apisReady, notifications: true })
    }

    if (apisReady.invites) initializeNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apisReady.invites])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container style={{ position: 'relative' }}>
      {user && user.account && user.account.is_verified && <WSS />}

      <Router user={user} />

      <Container
        style={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          maxWidth: 370,
          zIndex: 999999,
        }}
      >
        <ToastList />
      </Container>
    </Container>
  )
}
