import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  Container,
  Loading,
  LoadingBackdrop,
  RequireAuth,
  ToastList,
} from '@components'
import { AuthService, StorageService, WSS } from '@services'
import { match, preMatch } from '@slices/MatchSlice'
import { updateUser } from '@slices/UserSlice'
import {
  AccountView,
  AuthView,
  ConnectView,
  HomeView,
  InactiveView,
  LobbyView,
  MatchView,
  NotFoundView,
  ProfileView,
  SignupView,
  UpdateEmailView,
  VerifyView,
} from '@views'

export default function App() {
  const user = useSelector((state) => state.user)
  const userMatch = useSelector((state) => state.match.match)
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const authenticate = async (token) => {
      const user = await AuthService.login(token)

      if (user) {
        dispatch(updateUser(user))
        if (user.account) {
          if (user.account.pre_match) dispatch(preMatch(user.account.pre_match))
          else if (user.account.match) dispatch(match(user.account.match))
        }
      }
      setFetching(false)
    }

    const token = StorageService.get('token')
    if (token && !user) authenticate(token)
    else setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const unverifiedUser = user && user.account && !user.account.is_verified
  const newUser = user && !user.account

  const render = () => {
    return (
      <>
        <Route
          path="/"
          element={
            (!user && <HomeView />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) ||
            (unverifiedUser && <Navigate to="/verificar" replace />) || (
              <Navigate to="/jogar" replace />
            )
          }
        />

        <Route
          path="/jogar"
          element={
            <RequireAuth
              user={user}
              isUnverified={unverifiedUser}
              isNew={newUser}
              element={
                (userMatch && userMatch.status === 'loading' && (
                  <Navigate to="/conectar" replace />
                )) || <LobbyView />
              }
            />
          }
        />

        <Route
          path="/conta"
          element={
            <RequireAuth
              user={user}
              isUnverified={unverifiedUser}
              isNew={newUser}
              element={<AccountView />}
            />
          }
        />

        <Route
          path="/perfil/:userId"
          element={
            <RequireAuth
              user={user}
              isUnverified={unverifiedUser}
              isNew={newUser}
              element={<ProfileView />}
            />
          }
        />

        <Route
          path="/alterar-email"
          element={
            (!user && <Navigate to="/" replace />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) || (
              <UpdateEmailView />
            )
          }
        />

        <Route
          path="/verificar"
          element={
            (!user && <Navigate to="/" replace />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) ||
            (unverifiedUser && <VerifyView />) || (
              <Navigate to="/jogar" replace />
            )
          }
        />

        <Route
          path="/cadastrar"
          element={
            (!user && <Navigate to="/" replace />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <SignupView />) ||
            (unverifiedUser && <Navigate to="/verificar" replace />) || (
              <Navigate to="/jogar" replace />
            )
          }
        />

        <Route
          path="/conta-inativa"
          element={
            (!user && <Navigate to="/" replace />) ||
            (user.is_active && <Navigate to="/" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) ||
            (unverifiedUser && <Navigate to="/verificar" replace />) || (
              <InactiveView />
            )
          }
        />

        <Route
          path="/conectar"
          element={
            <RequireAuth
              user={user}
              isUnverified={unverifiedUser}
              isNew={newUser}
              element={
                (!userMatch && <Navigate to="/jogar" replace />) ||
                (userMatch && userMatch.status !== 'loading' && (
                  <Navigate to="/jogar" replace />
                )) || <ConnectView />
              }
            />
          }
        />

        <Route
          path="/partidas/:matchId"
          element={
            <RequireAuth
              user={user}
              isUnverified={unverifiedUser}
              isNew={newUser}
              element={<MatchView />}
            />
          }
        />
      </>
    )
  }

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container style={{ position: 'relative' }}>
      {user && user.account && user.account.is_verified && <WSS />}

      <Routes>
        {render()}
        <Route path="/auth" element={<AuthView />} />
        <Route path="/404" element={<NotFoundView />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>

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
