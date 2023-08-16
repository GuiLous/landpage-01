import { Image, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import logoFull from '@assets/images/logo_symbol_full.svg'

import { Container } from '@components'

import style from './SidebarLogo.module.css'

export default function SidebarLogo() {
  return (
    <Container column fitContent>
      <Container className={style.logoWrapper}>
        <Link as={ReactRouterLink} to="/jogar">
          <Image
            src={logoFull}
            height="auto"
            width="166"
            data-testid="logo-full"
          />
        </Link>
      </Container>
    </Container>
  )
}
