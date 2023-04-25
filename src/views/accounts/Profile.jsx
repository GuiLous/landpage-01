import { useSelector } from 'react-redux'

import { HeaderProfile } from '@components'
import { ProfileLayout } from '@layouts'

export default function ProfileView() {
  const user = useSelector((state) => state.user)

  return (
    <ProfileLayout>
      <HeaderProfile />
    </ProfileLayout>
  )
}
