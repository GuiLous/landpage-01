import { Button, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'

import { Container } from '@components'
import style from './ProfileNav.module.css'

export default function ProfileNav({ userId }) {
  const location = useLocation()

  const links = [
    {
      title: 'Perfil',
      path: `/perfil/${userId}`,
      isAvailable: true,
    },
    {
      title: 'Conta',
      path: '/conta',
      isAvailable: true,
    },
    {
      title: 'Inventário',
      path: '/inventario',
      isAvailable: false,
    },
  ]

  return (
    <Container className={style.container} gap={16} fitContent>
      {links.map((link, index) =>
        link.isAvailable ? (
          <Link as={ReactRouterLink} to={link.path} key={index}>
            <Button
              variant="outline"
              isActive={location.pathname.includes(link.path)}
            >
              {link.title}
            </Button>
          </Link>
        ) : (
          <Button variant="outline" isDisabled key={index}>
            {link.title}
          </Button>
        )
      )}
    </Container>
  )
}
