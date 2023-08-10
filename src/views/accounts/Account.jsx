import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import {
  ChangeEmailCard,
  Container,
  DeleteAccountCard,
  InactivateAccountCard,
  Loading,
  LoadingBackdrop,
  ProfileHeader,
} from '@components'
import { StorageService } from '@services'

import { useSelector } from 'react-redux'
import style from './Account.module.css'

export default function AccountView() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setFetching(true)
      const userToken = StorageService.get('token')

      const response = await ProfilesAPI.detail(userToken, user.id)
      if (response.errorMsg) {
        navigate('/404')
      }

      setProfile(response)
      setFetching(false)
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container column gap={40} className={style.container}>
      <Container className={style.header} column gap={40}>
        <ProfileHeader profile={profile} isUserLogged={true} />
      </Container>

      <Container align="center" className={style.title}>
        <Text
          fontSize={20}
          color="white"
          fontWeight="semiBold"
          lineHeight={1}
          as="h2"
        >
          CONFIGURAÇÕES DE CONTA
        </Text>
      </Container>

      <Container className={style.content}>
        <Container column gap={24}>
          <ChangeEmailCard />
          <Container style={{ alignItems: 'initial' }} gap={24}>
            <InactivateAccountCard />
            <DeleteAccountCard />
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
