import { Image } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import logoSymbol from '@assets/images/logo_symbol_white.svg'
import { Container, FriendList, SidebarHeader } from '@components'
import style from './Sidebar.module.css'

export default function Sidebar() {
  const user = useSelector((state) => state.user)

  return (
    <Container column className={style.container}>
      <Container fitContent>
        <SidebarHeader
          username={user.account.username}
          avatar={user.account.avatar.medium}
          userId={user.id}
        />
      </Container>

      <Container column>
        <FriendList />
      </Container>

      <Container className={style.footer} justify="center" fitContent>
        <Image src={logoSymbol} maxW={'24px'} />
      </Container>
    </Container>
  )
}
