import { useContext } from 'react'

import { ProfileDetailsContext } from '@contexts'

const useProfileDetails = () => {
  return useContext(ProfileDetailsContext)
}

export default useProfileDetails
