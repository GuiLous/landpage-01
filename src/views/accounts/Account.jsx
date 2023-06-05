import { Icon, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
  TrashIcon,
} from '@components'
import { ProfileLayout } from '@layouts'
import { StorageService } from '@services'

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
  const user = useSelector((state) => state.user)

  const navigate = useNavigate()

  const [fetching, setFetching] = useState(true)
  const [userStats, setUserStats] = useState(null)
  const [headerStats, setHeaderStats] = useState(null)

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
      const userToken = StorageService.get('token')

      const response = await ProfilesAPI.detail(userToken, user.id)
      if (response.errorMsg) {
        navigate('/404')
      }

      setUserStats(response)
      setFetching(false)
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userStats !== null) {
      const headerStats = {
        avatar: userStats.avatar,
        username: userStats.username,
        level: userStats.level,
        level_points: userStats.level_points,
        matches_won: userStats.matches_won,
        matches_lost: userStats.matches_played - userStats.matches_won,
        stats: userStats.stats,
      }

      setHeaderStats(headerStats)
    }
  }, [userStats])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <ProfileLayout
      headerStats={headerStats}
      activePage="conta"
      user_id={user.id}
    >
      <Container gap={80}>
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

        <Container column gap={24}>
          <ChangeEmailCard />
          <InactivateAccountCard />
          <DeleteAccountCard />
        </Container>
      </Container>
    </ProfileLayout>
  )
}
