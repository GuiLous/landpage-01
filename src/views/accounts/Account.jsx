import { Text, useMediaQuery } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  ChangeEmailCard,
  Container,
  DeleteAccountCard,
  InactivateAccountCard,
  Loading,
  LoadingBackdrop,
  ProfileHeader,
} from '@components'
import { useProfileDetails } from '@hooks'

import style from './Account.module.css'

export default function AccountView() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)

  const { fetching, profile, getProfileDetails } = useProfileDetails()

  useEffect(() => {
    getProfileDetails(user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container column gap={isLessThan2xl ? 30 : 40} className={style.container}>
      <Container className={style.header} column>
        <ProfileHeader profile={profile} isUserLogged={true} />
      </Container>

      <Container align="center" className={style.title}>
        <Text
          fontSize={{ base: 20, md: 18, '2xl': 20 }}
          color="white"
          fontWeight="semiBold"
          lineHeight={1}
          as="h2"
        >
          CONFIGURAÇÕES DE CONTA
        </Text>
      </Container>

      <Container className={style.content}>
        <Container column gap={isLessThan2xl ? 22 : 24}>
          <ChangeEmailCard />
          <Container
            style={{ alignItems: 'initial' }}
            gap={isLessThan2xl ? 22 : 24}
          >
            <InactivateAccountCard />
            <DeleteAccountCard />
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
