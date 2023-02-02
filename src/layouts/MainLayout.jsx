import { Link } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Container, Sidebar } from '@components'
import { HttpService, StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'
import style from './MainLayout.module.css'

export default function MainLayout(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const token = StorageService.get('token')
    await HttpService.patch('accounts/logout/', token)

    dispatch(updateUser(null))
    StorageService.remove('token')
    navigate('/')
  }

  return (
    <Container column className={style.container}>
      {user && (
        <Container className={style.header} align="center" justify="between">
          <Container gap={60}>
            <h2>LOGO</h2>

            <Link variant="inline" as={RouterLink} to="/jogar">
              Jogar
            </Link>
          </Container>

          <Container justify="end" gap={20}>
            <Link variant="inline" as={RouterLink} to="/minha-conta">
              Minha conta
            </Link>

            <Link variant="inline" onClick={handleLogout}>
              Sair
            </Link>
          </Container>
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
