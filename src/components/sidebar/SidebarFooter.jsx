import { Link } from '@chakra-ui/react'
import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiYoutube,
} from 'react-icons/si'

import { Container } from '@components'

import style from './SidebarFooter.module.css'

export default function SidebarFooter() {
  return (
    <Container className={style.footer} align="end">
      <Container gap={24}>
        <Link
          href="https://www.instagram.com/reloadclubgg/"
          isExternal
          fontSize={{ base: 18, md: 16, '2xl': 18 }}
        >
          <SiInstagram />
        </Link>

        <Link
          href="https://twitter.com/reloadclubgg"
          isExternal
          fontSize={{ base: 18, md: 16, '2xl': 18 }}
        >
          <SiTwitter />
        </Link>

        <Link
          href="https://discord.gg/mMMKshktfT"
          isExternal
          fontSize={{ base: 18, md: 16, '2xl': 18 }}
        >
          <SiDiscord />
        </Link>

        <Link
          href="https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A"
          isExternal
          fontSize={{ base: 18, md: 16, '2xl': 18 }}
        >
          <SiYoutube />
        </Link>

        <Link
          href="https://www.facebook.com/profile.php?id=100089787770305"
          isExternal
          fontSize={{ base: 18, md: 16, '2xl': 18 }}
        >
          <SiFacebook />
        </Link>
      </Container>
    </Container>
  )
}
