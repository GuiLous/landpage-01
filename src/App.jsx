import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { TokenLogin } from '@components'
import { WSS } from '@services'
import {
  AuthView,
  HomeView,
  LobbyView,
  ProfileView,
  SignupView,
  VerifyView,
} from '@views'

export default function App() {
  const user = useSelector((state) => state.user)

  return (
    <>
      {user && user.account && user.account.is_verified && <WSS />}
      <Routes>
        <Route
          path="/"
          element={
            <TokenLogin>
              <HomeView />
            </TokenLogin>
          }
        />
        <Route path="/auth" element={<AuthView />} />

        <Route
          path="/cadastrar"
          element={
            <TokenLogin>
              <SignupView />
            </TokenLogin>
          }
        />
        <Route
          path="/verificar"
          element={
            <TokenLogin>
              <VerifyView />
            </TokenLogin>
          }
        />

        <Route
          path="/jogar"
          element={
            <TokenLogin verifiedRequired redirect>
              <LobbyView />
            </TokenLogin>
          }
        />
        <Route
          path="/perfil"
          element={
            <TokenLogin verifiedRequired redirect>
              <ProfileView />
            </TokenLogin>
          }
        />

        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  )
}
