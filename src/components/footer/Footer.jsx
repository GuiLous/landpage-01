import { Hide, Link, Text } from '@chakra-ui/react'
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
            </Container>

            <Container align="center" justify="center">
              <Text fontSize={12} color="white">
                Copyright ©2023. Todos os direitos reservados.
              </Text>
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
          gap={24}
        >
          <Container column align="center" justify="center" gap={12}>
            <Container
              className={style.mobileBrand}
              align="center"
              justify="center"
            >
              <Link as={RouterLink} to="/" style={{ width: 130 }}>
                <img src={logo} alt="Reload" />
              </Link>
            </Container>

            <Container align="center" justify="center">
              <Text fontSize={12} color="white">
                Copyright ©2023. Todos os direitos reservados.
              </Text>
            </Container>
          </Container>

          <Container
            gap={24}
            className={style.social}
            align="center"
            justify="center"
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
