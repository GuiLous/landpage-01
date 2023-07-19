import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import {
  MainLayout,
  ProfileLayout,
  SidebarLayout,
  SignupLayout,
} from '@layouts'

import {
  AccountView,
  AuthView,
  ConnectView,
  HomeView,
  InactiveView,
  LobbyView,
  MaintenanceView,
  MatchView,
  NotFoundView,
  ProfileView,
  SignupView,
  UpdateEmailView,
  VerifyView,
} from '@views'

export default function Router({ user, maintenance }) {
  const location = useLocation()

  const signupRequired = user && !user.account
  const verificationRequired = user && user.account && !user.account.is_verified
  const activeUser = user && user.is_active
  const verifiedUser = activeUser && user.account && user.account.is_verified

  if (user) {
    if (location.pathname === '/manutencao' && !maintenance)
      return <Navigate to="/jogar" replace />

    if (
      location.pathname !== '/manutencao' &&
      location.pathname !== '/conta-inativa' &&
      location.pathname !== '/cadastrar' &&
      location.pathname !== '/verificar' &&
      location.pathname !== '/alterar-email' &&
      maintenance
    ) {
      return <Navigate to="/manutencao" replace />
    }

    if (location.pathname !== '/conta-inativa' && !activeUser)
      return <Navigate to="/conta-inativa" replace />

    if (location.pathname !== '/cadastrar' && signupRequired)
      return <Navigate to="/cadastrar" replace />

    if (
      location.pathname !== '/verificar' &&
      location.pathname !== '/alterar-email' &&
      verificationRequired
    ) {
      return <Navigate to="/verificar" replace />
    }
  }

  return (
    <Routes>
      {maintenance && (
        <Route path="/manutencao" element={<MaintenanceView />} />
      )}

      {user && !activeUser && (
        <Route path="/conta-inativa" element={<InactiveView />} />
      )}

      <Route path="/" element={<HomeView />} />

      {signupRequired && (
        <Route element={<SignupLayout />}>
          <Route path="/cadastrar" element={<SignupView />} />
        </Route>
      )}

      {verificationRequired && (
        <Route element={<SignupLayout />}>
          <Route path="/verificar" element={<VerifyView />} />
          <Route path="/alterar-email" element={<UpdateEmailView />} />
        </Route>
      )}

      {verifiedUser && (
        <>
          <Route
            path="/partidas/:matchId/conectar/"
            element={<ConnectView />}
          />
          <Route element={<SidebarLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/jogar" element={<LobbyView />} />
              <Route path="/partidas/:matchId" element={<MatchView />} />
            </Route>
            <Route element={<ProfileLayout />}>
              <Route path="/conta" element={<AccountView />} />
              <Route path="/perfil/:userId" element={<ProfileView />} />
            </Route>
          </Route>
        </>
      )}

      <Route path="/auth" element={<AuthView />} />
      <Route path="/404" element={<NotFoundView />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}
