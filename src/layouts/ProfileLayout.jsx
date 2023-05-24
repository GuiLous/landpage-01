import { useSelector } from 'react-redux'

import { Container, Footer, Header } from '@components'

import style from './ProfileLayout.module.css'

export default function ProfileLayout(props) {
  const user = useSelector((state) => state.user)

  return (
    <Container column className={style.container}>
      {user && <Header />}

      <Container className={style.content}>{props.children}</Container>

      <Footer />
    </Container>
  )
}
