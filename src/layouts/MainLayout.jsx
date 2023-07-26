import { Outlet } from 'react-router-dom'

import { Container } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <Container className={style.container}>
      <Outlet />
    </Container>
  )
}
