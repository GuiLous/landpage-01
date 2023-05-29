import { Avatar, Badge, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Container } from '@components'

import style from './SidebarHeader.module.css'

export default function SidebarHeader({ username, avatar, userId }) {
  return (
    <Container className={style.container} column gap={24}>
      <Container gap={18} className={style.userInfo} align="center">
        <Container fitContent>
          <Avatar src={avatar} size="lg" />
        </Container>

        <Container column className={style.menu}>
          <Container>
            <Text fontSize={14} fontWeight="medium" color="gray.700">
              Olá
            </Text>
          </Container>
          <Container>
            <Text fontSize={14} fontWeight="medium" textTransform="uppercase">
              {username}
            </Text>
          </Container>
        </Container>
      </Container>

      <Container column gap={8}>
        <Container>
          <Link as={RouterLink} to={`/perfil/${userId}`} className={style.link}>
            Perfil
          </Link>
        </Container>

        <Container>
          <Link as={RouterLink} to="/configuracoes" className={style.link}>
            Configurações
          </Link>
        </Container>

        <Container gap={10} align="center">
          <Link href="#" className={[style.link, style.disabled].join(' ')}>
            Loja
          </Link>
          <Badge size="sm" fontWeight="medium">
            Em breve
          </Badge>
        </Container>

        <Container gap={10} align="center">
          <Link href="#" className={[style.link, style.disabled].join(' ')}>
            Inventário
          </Link>
          <Badge size="sm" fontWeight="medium">
            Em breve
          </Badge>
        </Container>

        <Container>
          <Link href="#" className={style.link}>
            Sair
          </Link>
        </Container>
      </Container>
    </Container>
  )
}
