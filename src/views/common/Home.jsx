import { Button, Divider, Hide, Show } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SiDiscord, SiSteam } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import arrow from '@assets/images/arrow.png'
import animatedBg from '@assets/images/home_bg_animated.gif'
import heroImg from '@assets/images/home_hero.png'
import heroMobileImg from '@assets/images/home_mobile_hero.png'
import joinUsGraphic from '@assets/images/join_us_graphic.png'
import logo from '@assets/images/logo_type_white.svg'
import { Container, FakeSigninForm, Footer } from '@components'
import { REACT_APP_API_URL, REACT_APP_ENV } from '@config'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateMatch, updatePreMatch } from '@slices/MatchmakingSlice'
import style from './Home.module.css'

export default function HomeView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [fetching, setFetching] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState(null)

  useEffect(() => {
    if (user && user.account && user.account.is_verified) navigate('/jogar')
  })

  const onFakeSigninFormSubmit = async (form) => {
    setFetching(true)
    let response

    response = await HttpService.post('accounts/fake-signup/', null, form)
    if (response.fieldsErrors) {
      setFieldsErrors(response.fieldsErrors)
      setFetching(false)
      return
    } else if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      setFetching(false)
      return
    }

    setFetching(false)
    StorageService.set('token', response.token)

    if (response.account) {
      if (response.account.pre_match) {
        dispatch(updatePreMatch(response.account.pre_match))
      } else if (response.account.match) {
        dispatch(updateMatch(response.account.match))
      }
    }
    // refresh and redirect to /jogar or /verificar
    navigate(0)
  }

  return (
    <>
      <Hide below="md">
        <Container
          column
          align="center"
          justify="center"
          className={style.container}
        >
          <Container align="center">
            <Container
              className={style.animatedBg}
              align="center"
              justify="center"
            >
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas ut tellus ex. Sed in orci risus. Morbi qui lacus eget
                  tellus tristique congue.
                </p>
              </Container>

              <Container className={style.actions}>
                <form
                  action={`${REACT_APP_API_URL}/accounts/login/steam/`}
                  method="POST"
                  style={{ display: 'flex', width: '100%' }}
                >
                  <Button
                    type="submit"
                    size={'lg'}
                    fontWeight="regular"
                    style={{ fontSize: 16, width: '100%' }}
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
                </form>
              </Container>

              {REACT_APP_ENV === 'local' ? (
                <Container className={style.fakeSigninForm} column>
                  <Divider />
                  <FakeSigninForm
                    fieldsErrors={fieldsErrors}
                    fetching={fetching}
                    onSubmit={onFakeSigninFormSubmit}
                  />
                </Container>
              ) : null}
            </Container>
          </Container>

          <Footer />
        </Container>
      </Hide>

      <Show below="md">
        <Container
          column
          className={style.containerMobile}
          align="center"
          justify="center"
        >
          <Container className={style.mobileJoinUs} align="center">
            <Container justify="center" style={{ flex: '1.6 1' }}>
              MADE FOR GAMERS
            </Container>
            <Container justify="center" style={{ maxWidth: 30 }}>
              <img src={arrow} alt="-->" />
            </Container>
            <Container justify="center">JOIN US</Container>
            <Container justify="center">
              <img src={joinUsGraphic} alt="Join Us" />
            </Container>
          </Container>

          <Container>
            <img src={heroMobileImg} alt="Personagem do GTA 5" />
          </Container>

          <Container className={style.mobileContent} column>
            <Container className={style.mobileBrand}>
              <img src={logo} alt="Reload" />
            </Container>

            <Container>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas ut tellus ex. Sed in orci risus. Morbi qui lacus eget
                tellus tristique congue.
              </p>
            </Container>

            <Container>
              <Button
                size={'lg'}
                style={{ fontSize: 16 }}
                leftIcon={<SiDiscord style={{ fontSize: 26 }} />}
              >
                Faça parte do nosso
                <strong
                  style={{
                    display: 'inline-block',
                    marginLeft: 5,
                  }}
                >
                  Discord
                </strong>
              </Button>
            </Container>
          </Container>
        </Container>

        <Footer />
      </Show>
    </>
  )
}
