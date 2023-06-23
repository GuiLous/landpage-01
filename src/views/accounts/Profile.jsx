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
import { StorageService } from '@services'

export default function ProfileView() {
  const params = useParams()
  const navigate = useNavigate()

  const { userId } = params

  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetch = async () => {
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
  }, [])

  return fetching ? (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  ) : (
    <Container gap={18}>
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
  )
}
