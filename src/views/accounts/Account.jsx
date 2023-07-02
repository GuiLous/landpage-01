import { Hide, Icon, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import {
  BlockIcon,
  ChangeEmailCard,
  Container,
  DeleteAccountCard,
  InactivateAccountCard,
  Loading,
  LoadingBackdrop,
  MessageIcon,
  ProfileHeader,
  TrashIcon,
} from '@components'
import { StorageService } from '@services'

import { useSelector } from 'react-redux'
import style from './Account.module.css'

const linksOptions = [
  {
    id: 'email',
    label: 'Alterar e-mail',
  },
  {
    id: 'inactive',
    label: 'Inativar conta',
  },
  {
    id: 'delete',
    label: 'Excluir conta',
  },
]

const icons = {
  email: MessageIcon,
  inactive: BlockIcon,
  delete: TrashIcon,
}

export default function AccountView() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState(null)

  const renderLinks = () => {
    return (
      <Container gap={22} column>
        {linksOptions.map((linkItem) => (
          <Link
            key={linkItem.id}
            href={'#' + linkItem.id}
            color="gray.700"
            fontWeight="regular"
            fontSize={18}
            lineHeight={1}
            display="flex"
            alignItems="center"
            gap="10px"
            className={style.link}
          >
            <Icon as={icons[`${linkItem.id}`]} fill="gray.700" />
            <Text>{linkItem.label}</Text>
          </Link>
        ))}
      </Container>
    )
  }

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
        <ProfileHeader profile={profile} />
      </Container>

      <Container className={style.content}>
        <Hide above="2xl">
          <Container column style={{ maxWidth: '350px' }}>
            <Container fitContent style={{ marginBottom: '40px' }}>
              <Text
                color="white"
                fontWeight="bold"
                fontSize={20}
                textTransform="uppercase"
              >
                Gerenciamento de conta
              </Text>
            </Container>

            {renderLinks()}
          </Container>
        </Hide>
        <Container column gap={24}>
          <ChangeEmailCard />
          <InactivateAccountCard />
          <DeleteAccountCard />
        </Container>
      </Container>
    </Container>
  )
}
