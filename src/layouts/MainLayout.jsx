import { useSelector } from 'react-redux'

import { Container, Header, Sidebar } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)

  return (
    <Container className={style.container}>
      <Container column className={style.wrapper}>
        {user && <Header />}

        <Container className={style.content}>{props.children}</Container>
      </Container>

      {user && (
        <Container className={style.sidebar}>
          <Sidebar />
        </Container>
      )}
    </Container>
  )
}
