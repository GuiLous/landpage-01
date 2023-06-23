import { Outlet } from 'react-router-dom'

import { Container, Sidebar } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <Container className={style.container}>
      <Container className={style.sidebar} fitContent>
        <Sidebar />
      </Container>
      <Container className={style.content}>
        <Outlet />
      </Container>
    </Container>
  )
}
