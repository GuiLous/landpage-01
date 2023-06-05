import { useSelector } from 'react-redux'

import { Container, Sidebar } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)

  return (
    <Container className={style.container}>
      {user && (
        <Container className={style.sidebar} fitContent>
          <Sidebar />
        </Container>
      )}
      <Container className={style.content}>{props.children}</Container>
    </Container>
  )
}
