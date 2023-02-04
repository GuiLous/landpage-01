import { Button, Divider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SiDiscord, SiSteam } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import animatedBg from '@assets/images/home_bg_animated.gif'
import heroImg from '@assets/images/home_hero.png'
import logo from '@assets/images/logo_type_white.svg'
import { Container, FakeSigninForm, Footer } from '@components'
import { REACT_APP_API_URL, REACT_APP_ENV } from '@config'
import { HttpService, StorageService, Toast } from '@services'
import { updateUser } from '@slices/UserSlice'
import style from './Home.module.css'

export default function HomeView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [fetching, setFetching] = useState(false)
  const [formError, setFormError] = useState()

  useEffect(() => {
    if (user && user.account && user.account.is_verified) navigate('/jogar')
  })

  const onFakeSigninFormSubmit = async (form) => {
    setFetching(true)
    let response

    response = await HttpService.post('accounts/fake-signup/', null, form)
    if (response.errorMsg) {
      setFetching(false)
      if (response.field) setFormError(response)
      else
        Toast({
          title: 'Oops, ocorreu um erro',
          description: response.errorMsg,
          status: 'error',
        })
      return
    }

    setFetching(false)

    dispatch(updateUser(response))
    StorageService.set('token', response.token)
    if (response.account.is_verified) navigate('/jogar')
    else navigate('/verificar')
  }

  return (
    <Container
      column
      align="center"
      justify="center"
      className={style.container}
    >
      <Container align="center">
        <Container className={style.animatedBg} align="center" justify="center">
          <img src={animatedBg} alt="Fundo animado" />
        </Container>

        <Container className={style.heroImg} align="center" justify="end">
          <img src={heroImg} alt="Personagem do GTA 5" />
        </Container>

        <Container column className={style.hero} gap={25} justify="center">
          <Container className={style.brand}>
            <img src={logo} alt="Reload" />
          </Container>

          <Container className={style.description}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              ut tellus ex. Sed in orci risus. Morbi qui lacus eget tellus
              tristique congue.
            </p>
          </Container>

          <Container justify="between" className={style.actions} gap={12}>
            <form
              action={`${REACT_APP_API_URL}/accounts/login/steam/`}
              method="POST"
              style={{ display: 'flex', gap: 12, width: '100%' }}
            >
              <Button
                type="submit"
                size={'lg'}
                style={{ fontSize: 16 }}
                leftIcon={<SiSteam style={{ fontSize: 26 }} />}
              >
                Entrar com
                <strong
                  style={{
                    display: 'inline-block',
                    marginLeft: 5,
                  }}
                >
                  Steam
                </strong>
              </Button>
              <Button size={'lg'} variant={'secondary'}>
                <SiDiscord style={{ fontSize: 26 }} />
              </Button>
            </form>
          </Container>

          {REACT_APP_ENV === 'local' ? (
            <Container className={style.fakeSigninForm} column>
              <Divider />
              <FakeSigninForm
                formError={formError}
                fetching={fetching}
                onSubmit={onFakeSigninFormSubmit}
              />
            </Container>
          ) : null}
        </Container>
      </Container>

      <Footer />
    </Container>
  )
}
