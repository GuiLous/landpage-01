import { Outlet } from 'react-router-dom'

import { Container, Sidebar } from '@components'

import style from './SidebarLayout.module.css'

export default function SidebarLayout() {
  return (
    <Container className={style.container}>
      <Container className={style.sidebar}>
        <Sidebar />
      </Container>

      <Container className={style.content}>
        <Outlet />
      </Container>
    </Container>
  )
}
