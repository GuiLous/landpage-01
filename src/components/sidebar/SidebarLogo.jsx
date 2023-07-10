import { Image, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import logoFull from '@assets/images/logo_symbol_full.svg'
import logoSymbol from '@assets/images/logo_symbol_white.svg'

import { Container } from '@components'

import style from './SidebarLogo.module.css'

export default function SidebarLogo({ isCollapsed }) {
  return (
    <Container column fitContent>
      <Container className={style.logoWrapper}>
        <Link as={ReactRouterLink} to="/jogar">
          <Image
            src={logoSymbol}
            style={{ height: isCollapsed ? 'auto' : 0 }}
            data-testid="logo-symbol"
          />
          <Image
            src={logoFull}
            style={{ height: !isCollapsed ? 'auto' : 0 }}
            data-testid="logo-full"
          />
        </Link>
      </Container>
    </Container>
  )
}
