import { useSelector } from 'react-redux'

import { MainLayout } from '@layouts'
import { Container } from '@components'

export default function ProfileView() {
  const user = useSelector((state) => state.user)

  return (
    <MainLayout>
      <Container style={{ padding: 10 }}>
        {user.account.username}'s profile page
      </Container>
    </MainLayout>
  )
}
