import { Link } from '@chakra-ui/react'
import React from 'react'
import { SiDiscord, SiInstagram, SiTwitter } from 'react-icons/si'
import { Link as RouterLink } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'
import { Container } from '@components'
import style from './Footer.module.css'

export default function Footer(props) {
  return (
    <Container
      className={style.container}
      fitContent
      align="center"
      justify="center"
    >
      <Container align="center" justify="center" className={style.wrapper}>
        <Container column className={style.brand} gap={12}>
          <img src={logo} alt="Reload" />
          <p>Copyright ©2023. Todos os direitos reservados.</p>
        </Container>
        <Container column gap={5}>
          Informações
          <ul className={style.links}>
            <li>
              <Link as={RouterLink} to="/termos-de-uso">
                Termos de uso
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/política-de-privacidade">
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/codigo-de-conduta">
                Código de conduta
              </Link>
            </li>
          </ul>
        </Container>
        <Container justify="end" gap={24} className={style.social}>
          <Link href="https://instagram.com" isExternal>
            <SiInstagram />
          </Link>

          <Link href="https://twitter.com" isExternal>
            <SiTwitter />
          </Link>

          <Link href="https://discord.com" isExternal>
            <SiDiscord />
          </Link>
        </Container>
      </Container>
    </Container>
  )
}
