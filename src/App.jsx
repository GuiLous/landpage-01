import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Loading, LoadingBackdrop } from '@components'
import { AuthService, StorageService, WSS } from '@services'
import { updateUser } from '@slices/UserSlice'
import {
  AccountView,
  AuthView,
  HomeView,
  InactiveView,
  LobbyView,
  NotFoundView,
  ProfileView,
  SignupView,
  UpdateEmailView,
  VerifyView,
} from '@views'

export default function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const authenticate = async (token) => {
      const user = await AuthService.login(token)

      if (user) dispatch(updateUser(user))
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
            (!user && <Navigate to="/" replace />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) ||
            (unverifiedUser && <Navigate to="/verificar" replace />) || (
              <LobbyView />
            )
          }
        />

        <Route
          path="/minha-conta"
          element={
            (!user && <Navigate to="/" replace />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) ||
            (unverifiedUser && <Navigate to="/verificar" replace />) || (
              <AccountView />
            )
          }
        />

        <Route
          path="/perfil"
          element={
            (!user && <Navigate to="/" replace />) ||
            (!user.is_active && <Navigate to="/conta-inativa" replace />) ||
            (newUser && <Navigate to="/cadastrar" replace />) ||
            (unverifiedUser && <Navigate to="/verificar" replace />) || (
              <ProfileView />
            )
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
      </>
    )
  }

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <>
      {user && user.account && user.account.is_verified && <WSS />}

      <Routes>
        {render()}
        <Route path="/auth" element={<AuthView />} />
        <Route path="/404" element={<NotFoundView />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  )
}
