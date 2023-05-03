import { Hide, Link } from '@chakra-ui/react'
import React from 'react'
import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiYoutube,
} from 'react-icons/si'
import { Link as RouterLink } from 'react-router-dom'

import logo from '@assets/images/logo_type_white.svg'
import { Container } from '@components'
import style from './Footer.module.css'

export default function Footer(props) {
  return (
    <>
      <Hide below="md">
        <Container
          className={style.container}
          fitContent
          align="center"
          justify="center"
        >
          <Container align="center" justify="center" className={style.wrapper}>
            <Container column className={style.brand} gap={12}>
              <Link as={RouterLink} to="/" style={{ width: 170 }}>
                <img src={logo} alt="Reload" />
              </Link>
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
              <Link href="https://www.instagram.com/reloadclubgg/" isExternal>
                <SiInstagram />
              </Link>

              <Link href="https://twitter.com/reloadclubgg" isExternal>
                <SiTwitter />
              </Link>

              <Link href="https://discord.gg/mMMKshktfT" isExternal>
                <SiDiscord />
              </Link>

              <Link
                href="https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A"
                isExternal
              >
                <SiYoutube />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=100089787770305"
                isExternal
              >
                <SiFacebook />
              </Link>
            </Container>
          </Container>
        </Container>
      </Hide>

      <Hide above="md">
        <Container
          className={style.mobileContainer}
          fitContent
          align="center"
          justify="center"
          column
        >
          <Container
            column
            className={style.mobileBrand}
            gap={12}
            align="center"
            justify="center"
          >
            <Link as={RouterLink} to="/" style={{ width: 130 }}>
              <img src={logo} alt="Reload" />
            </Link>

            <p style={{ fontSize: '14px', color: 'white' }}>
              Copyright ©2023. Todos os direitos reservados.
            </p>
          </Container>

          <Container column gap={5}>
            <p style={{ color: 'white', marginTop: '32px' }}>Informações</p>
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

          <Container
            gap={24}
            className={style.social}
            style={{ marginTop: '32px' }}
          >
            <Link href="https://www.instagram.com/reloadclubgg/" isExternal>
              <SiInstagram />
            </Link>

            <Link href="https://twitter.com/reloadclubgg" isExternal>
              <SiTwitter />
            </Link>

            <Link href="https://discord.gg/mMMKshktfT" isExternal>
              <SiDiscord />
            </Link>

            <Link
              href="https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A"
              isExternal
            >
              <SiYoutube />
            </Link>

            <Link
              href="https://www.facebook.com/profile.php?id=100089787770305"
              isExternal
            >
              <SiFacebook />
            </Link>
          </Container>
        </Container>
      </Hide>
    </>
  )
}
