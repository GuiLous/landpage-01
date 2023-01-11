import { useSelector } from 'react-redux'

import { Container } from '@components'

import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)

  return (
    <Container column className={style.container}>
      {user ? (
        <Container className={style.header}>
          <p>Header</p>
        </Container>
      ) : null}

      <Container className={style.content}>{props.children}</Container>
    </Container>
  )
}
