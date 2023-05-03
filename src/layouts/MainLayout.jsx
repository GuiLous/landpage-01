import { useSelector } from 'react-redux'

import { Container, Header, Sidebar } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)

  return (
    <Container column className={style.container}>
      {user && <Header />}

      <Container gap={56} className={style.wrapper}>
        <Container className={style.content}>{props.children}</Container>

        {user && (
          <Container className={style.sidebar}>
            <Sidebar />
          </Container>
        )}
      </Container>
    </Container>
  )
}
