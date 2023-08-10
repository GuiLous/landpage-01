import { createContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import { StorageService } from '@services'

export const ProfileDetailsContext = createContext()

function ProfileDetailsProvider({ children }) {
  const navigate = useNavigate()

  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState(null)

  const getProfileDetails = async (userId, showLoading = true) => {
    showLoading && setFetching(true)
    const userToken = StorageService.get('token')

    const response = await ProfilesAPI.detail(userToken, userId)
    if (response.errorMsg) {
      navigate('/404')
    }

    setProfile(response)
    setFetching(false)
  }

  return (
    <ProfileDetailsContext.Provider
      value={{ profile, fetching, getProfileDetails }}
    >
      {children}
    </ProfileDetailsContext.Provider>
  )
}

export default ProfileDetailsProvider
