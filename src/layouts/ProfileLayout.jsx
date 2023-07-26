import { Outlet } from 'react-router-dom'

import { Container } from '@components'
import style from './ProfileLayout.module.css'

export default function ProfileLayout() {
  return (
    <Container className={style.container} column>
      <Container className={style.content} column>
        <Outlet />
      </Container>
    </Container>
  )
}
