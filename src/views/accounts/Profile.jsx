import { useMediaQuery } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Container,
  HeatmapStatsCard,
  LevelStatsCard,
  Loading,
  LoadingBackdrop,
  MatchHistoryList,
  ProfileHeader,
} from '@components'
import { useProfileDetails } from '@hooks'

import style from './Profile.module.css'

export default function ProfileView() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)

  const params = useParams()

  const { fetching, profile, getProfileDetails } = useProfileDetails()

  const { userId } = params

  useEffect(() => {
    getProfileDetails(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container column gap={isLessThan2xl ? 30 : 40}>
      <Container className={style.header} column>
        <ProfileHeader
          profile={profile}
          isUserLogged={Number(userId) === user.id}
        />
      </Container>

      <Container gap={isLessThan2xl ? 16 : 18} className={style.content}>
        <Container
          column
          gap={isLessThan2xl ? 16 : 18}
          style={{
            maxWidth: isLessThan2xl ? '300px' : '350px',
            alignSelf: 'flex-start',
          }}
        >
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

        <MatchHistoryList user_id={userId} username={profile.username} />
      </Container>
    </Container>
  )
}
