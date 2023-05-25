import { BaseAPI } from './Base'

export const ProfilesAPI = {
  async detail(token, user_id) {
    return await BaseAPI.detail(`profiles?user_id=${user_id}`, token)
  },
}

export default ProfilesAPI
