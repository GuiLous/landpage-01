import { useSelector } from 'react-redux'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { Container, ProfileHeader, ProfileNav } from '@components'
import style from './ProfileLayout.module.css'

export default function ProfileLayout() {
  const params = useParams()
  const location = useLocation()
  const user = useSelector((state) => state.user)

  const { userId } = params
  const hideNav =
    location.pathname.includes('perfil') && parseInt(userId) !== user.id

  return (
    <Container className={style.container} column>
      <Container className={style.header} column gap={40}>
        <ProfileHeader account={user.account} />
        {!hideNav && <ProfileNav userId={user.id} />}
      </Container>

      <Container className={style.content} column>
        <Outlet />
      </Container>
    </Container>
  )
}
