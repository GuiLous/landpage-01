import { Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { Container } from '@components'
import { MainLayout } from '@layouts'

export default function AccountView() {
  const user = useSelector((state) => state.user)

  return (
    <MainLayout>
      <Container column gap={30}>
        <Container>{user.account.username}'s account page</Container>

        <Container>
          <UnorderedList>
            <ListItem>
              <Link as={RouterLink} to="/alterar-email">
                Alterar e-mail
              </Link>
            </ListItem>

            <ListItem>
              <Link>Inativar conta</Link>
            </ListItem>
          </UnorderedList>
        </Container>
      </Container>
    </MainLayout>
  )
}
