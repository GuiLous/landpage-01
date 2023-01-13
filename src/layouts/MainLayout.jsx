import { useSelector } from 'react-redux'

import { Container } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)

  return (
    <Container column className={style.container}>
      {user ? (
        <Container className={style.header} align="center">
          <h2>LOGO</h2>
        </Container>
      ) : null}

      <Container gap={56} className={style.wrapper}>
        <Container className={style.content}>{props.children}</Container>

        <Container className={style.sidebar}>
          <h2>Sidebar</h2>
        </Container>
      </Container>
    </Container>
  )
}
