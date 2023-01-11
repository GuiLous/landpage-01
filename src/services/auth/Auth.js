import { HttpService } from '@services'

export const AuthService = {
  async login(token) {
    if (!token) return null
    let response

    try {
      response = await HttpService.get('accounts/auth/', token)
    } catch (error) {
      return null
    }

    return response
  },
}

export default AuthService
