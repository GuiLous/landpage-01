import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AccountsAPI } from '@api'
import {
  Container,
  FavoriteWeaponCard,
  HeaderProfile,
  HeatmapStatsCard,
  LevelStatsCard,
  Loading,
  LoadingBackdrop,
  MatchHistoryList,
} from '@components'
import { ProfileLayout } from '@layouts'
import { StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'

import style from './Profile.module.css'

const buttonsOptions = ['perfil', 'inventário', 'configurações']

export default function ProfileView() {
  const params = useParams()
  const dispatch = useDispatch()

  const { userId } = params

  const [fetching, setFetching] = useState(true)
  const [selectedButton, setSelectedButton] = useState('perfil')
  const [userStats, setUserStats] = useState(null)

  const profile = {
    avatar: {
      medium:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    },
    status: 'online',
    username: 'fulaninhodetal',
    level: 20,
    level_points: 80,
    stats: {
      wins: 80,
    },
  }

  const levelCardStats = {
    level: 20,
    highest_level: 23,
    match_wins: 102,
    highest_win_streak: 8,
    latest_matches_results: ['V', 'D', 'D', 'V', 'V'],
    stats: {
      kills: 240,
      deaths: 640,
      assists: 350,
      damage: 65020,
      hs_kills: 45,
      clutch_v1: 39,
      clutch_v2: 25,
      clutch_v3: 9,
      clutch_v4: 0,
      clutch_v5: 1,
      shots_fired: 4500,
      head_shots: 45,
      chest_shots: 4065,
      other_shots: 390,
      most_kills_in_a_match: 14,
      most_damage_in_a_match: 890,
    },
  }

  const heatmapCardStats = {
    head_shots: 10,
    chest_shots: 30,
    other_shots: 60,
  }

  const weapon = {
    avatar:
      'https://static.wikia.nocookie.net/gtawiki/images/5/56/AssaultSMG-GTAV-SocialClub.png',
    name: 'SMG',
    type: 'Submetralhadora',
    stats: {
      kills: 450,
      assists: 900,
      head_shots: 133,
      shots_fired: 3450,
      hit_shots: 1390,
      matches: 230,
      wins: 103,
    },
  }

  const user = {
    id: 2,
    status: 'online',
    account: {
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
    },
  }

  const renderButtonsNavigation = () => {
    return buttonsOptions.map((btnOption) => (
      <Button
        key={btnOption}
        w="fit-content"
        variant="secondary"
        fontSize={14}
        fontWeight={400}
        py="14px"
        px="16px"
        textTransform="uppercase"
        color={selectedButton === btnOption ? 'white' : 'gray.700'}
        borderColor={selectedButton === btnOption ? 'white' : 'gray.700'}
        _hover={{ bg: 'transparent', borderColor: 'white' }}
        onClick={() => setSelectedButton(btnOption)}
      >
        {btnOption}
      </Button>
    ))
  }

  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await AccountsAPI.detail(userToken, userId)
      if (response.errorMsg) {
        dispatch(
          addToast({
            title: 'Algo saiu errado...',
            content: response.errorMsg,
            variant: 'error',
          })
        )
        return
      }

      setUserStats(response)
    }

    fetch()
    setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <ProfileLayout>
      <Container column fitContent className={style.container} gap={40}>
        <HeaderProfile profile={profile} />

        <Container align="center" gap={14}>
          {renderButtonsNavigation()}
        </Container>

        <Container gap={18}>
          <Container column gap={18} style={{ maxWidth: '350px' }}>
            <LevelStatsCard {...levelCardStats} />
            <HeatmapStatsCard {...heatmapCardStats} />
            <FavoriteWeaponCard weapon={weapon} />
          </Container>

          <MatchHistoryList user={user} />
        </Container>
      </Container>
    </ProfileLayout>
  )
}
