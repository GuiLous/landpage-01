import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import {
  Container,
  HeatmapStatsCard,
  LevelStatsCard,
  Loading,
  LoadingBackdrop,
  MatchHistoryList,
} from '@components'
import { ProfileLayout } from '@layouts'
import { StorageService } from '@services'

export default function ProfileView() {
  const params = useParams()
  const navigate = useNavigate()

  const { userId } = params

  const [fetching, setFetching] = useState(true)
  const [userStats, setUserStats] = useState(null)
  const [headerStats, setHeaderStats] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await ProfilesAPI.detail(userToken, userId)
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
    <ProfileLayout headerStats={headerStats}>
      <Container gap={18}>
        <Container column gap={18} style={{ maxWidth: '350px' }}>
          <LevelStatsCard
            level={userStats.level}
            highest_level={userStats.highest_level}
            match_won={userStats.matches_won}
            highest_win_streak={userStats.highest_win_streak}
            latest_matches_results={userStats.latest_matches_results}
            most_kills_in_a_match={userStats.most_kills_in_a_match}
            most_damage_in_a_match={userStats.most_damage_in_a_match}
            stats={userStats.stats}
          />
          <HeatmapStatsCard
            head_shots={userStats.stats?.head_shots || 0}
            chest_shots={userStats.stats?.chest_shots || 0}
            other_shots={userStats.stats?.other_shots || 0}
          />
        </Container>
        <MatchHistoryList user_id={userId} />
      </Container>
    </ProfileLayout>
  )
}
