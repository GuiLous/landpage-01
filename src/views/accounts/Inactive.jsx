import { Icon, Link } from '@chakra-ui/react'
import React from 'react'
import { SiDiscord, SiFacebook, SiInstagram, SiTwitter } from 'react-icons/si'
import { useDispatch } from 'react-redux'

import { AccountsAPI } from '@api'
import { Container, Footer } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import inactiveBg from '@assets/images/inactive_bg.png'
import style from './Inactive.module.css'

export default function InactiveView(props) {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const token = StorageService.get('token')
    const response = await AccountsAPI.logout(token)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      return
    }

    StorageService.remove('token')
    window.location.href = '/'
  }

  return (
    <Container
      className={style.container}
      column
      align="center"
      justify="center"
    >
      <Container column align="center" justify="center">
        <Container fitContent justify="center" className={style.hero}>
          <img src={inactiveBg} alt="Imagem de usuário inativo" />
        </Container>

        <h2 className={style.title}>Sua conta está inativa</h2>

        <Container
          className={style.body}
          column
          align="center"
          justify="center"
          fitContent
          gap={30}
        >
          <Container align="center" justify="center">
            Isso significa que ou você solicitou a inativação ou <br />
            nossa equipe encontrou algum problema na sua conta.
          </Container>

          <Container align="center" justify="center">
            Se você quer reativar a sua conta e continuar jogando, <br />
            entre em contato com nosso suporte em um dos nossos canais.
          </Container>
        </Container>

        <Container
          justify="center"
          className={style.social}
          fitContent
          gap={30}
        >
          <Link href="https://discord.gg/8TaCAQ7cce" isExternal>
            <Icon as={SiDiscord} data-testid="discord" />
          </Link>
          <Link href="https://www.instagram.com/reloadclubgg/" isExternal>
            <Icon as={SiInstagram} data-testid="instagram" />
          </Link>
          <Link href="https://twitter.com/reloadclubgg" isExternal>
            <Icon as={SiTwitter} data-testid="twitter" />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100089787770305"
            isExternal
          >
            <Icon as={SiFacebook} data-testid="facebook" />
          </Link>
        </Container>

        <Container className={style.logout} justify="center" fitContent>
          <Link onClick={handleLogout}>Sair e voltar para página inicial</Link>
        </Container>
      </Container>

      <Footer />
    </Container>
  )
}
