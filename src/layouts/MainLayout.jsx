import { Link } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Sidebar } from '@components'
import { StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'

import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(updateUser(null))
    StorageService.remove('token')
  }

  return (
    <Container column className={style.container}>
      {user && (
        <Container className={style.header} align="center" justify="between">
          <h2>LOGO</h2>
          <Link variant="inline" onClick={handleLogout}>
            Sair
          </Link>
        </Container>
      )}

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
