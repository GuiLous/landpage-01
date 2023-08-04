import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import {
  Container,
  HeatmapStatsCard,
  LevelStatsCard,
  Loading,
  LoadingBackdrop,
  MatchHistoryList,
  ProfileHeader,
} from '@components'
import { StorageService } from '@services'

import style from './Profile.module.css'

export default function ProfileView() {
  const params = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const { userId } = params

  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setFetching(true)
      const userToken = StorageService.get('token')

      const response = await ProfilesAPI.detail(userToken, userId)
      if (response.errorMsg) {
        navigate('/404')
      }

      setProfile(response)
      setFetching(false)
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container column gap={40}>
      <Container className={style.header} column gap={40}>
        <ProfileHeader
          profile={profile}
          isUserLogged={Number(userId) === user.id}
        />
      </Container>

      <Container gap={18} className={style.content}>
        <Container column gap={18} style={{ maxWidth: '350px' }}>
          <LevelStatsCard
            level={profile.level}
            highest_level={profile.highest_level}
            match_won={profile.matches_won}
            highest_win_streak={profile.highest_win_streak}
            latest_matches_results={profile.latest_matches_results}
            most_kills_in_a_match={profile.most_kills_in_a_match}
            most_damage_in_a_match={profile.most_damage_in_a_match}
            stats={profile.stats}
          />
          <HeatmapStatsCard
            head_shots={profile.stats.head_shots || 0}
            chest_shots={profile.stats.chest_shots || 0}
            other_shots={profile.stats.other_shots || 0}
          />
        </Container>

        <MatchHistoryList user_id={userId} />
      </Container>
    </Container>
  )
}
